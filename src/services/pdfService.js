import jsPDF from 'jspdf'

/**
 * Optional: pass { fonts: { regular, bold, italic, bolditalic } } where each value is a Base64 TTF string.
 * Example (pseudo):
 *   new SessionPDFGenerator({ fonts: { regular: notoRegularBase64, bold: notoBoldBase64 } })
 *
 * If no fonts are provided, the generator falls back to built-in Helvetica and sanitizes unsupported glyphs.
 */
export class SessionPDFGenerator {
  constructor(opts = {}) {
    this.doc = new jsPDF('p', 'mm', 'a4')

    // Page metrics
    const size = this.doc.internal.pageSize
    this.pageWidth = size.getWidth ? size.getWidth() : size.width
    this.pageHeight = size.getHeight ? size.getHeight() : size.height

    // Layout constants
    this.margin = 20
    this.bottomMargin = 30
    this.headerHeight = 40
    this.contentWidth = this.pageWidth - this.margin * 2
    this.y = this.margin
    this.sectionGap = 14

    // Typography
    this.fonts = opts.fonts || null
    this.fontFamily = 'helvetica'
    this.bodySize = 11
    this.h1Size = 24
    this.h2Size = 16
    this.h3Size = 13
    this.lineHeight = 6 // in mm for 11pt—tuned to prevent cramping

    // Register custom Unicode fonts if provided
    if (this.fonts?.regular) {
      try {
        this.doc.addFileToVFS('NotoSans-Regular.ttf', this.fonts.regular)
        this.doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal')
        if (this.fonts.bold) {
          this.doc.addFileToVFS('NotoSans-Bold.ttf', this.fonts.bold)
          this.doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold')
        }
        if (this.fonts.italic) {
          this.doc.addFileToVFS('NotoSans-Italic.ttf', this.fonts.italic)
          this.doc.addFont('NotoSans-Italic.ttf', 'NotoSans', 'italic')
        }
        if (this.fonts.bolditalic) {
          this.doc.addFileToVFS('NotoSans-BoldItalic.ttf', this.fonts.bolditalic)
          this.doc.addFont('NotoSans-BoldItalic.ttf', 'NotoSans', 'bolditalic')
        }
        this.fontFamily = 'NotoSans'
      } catch (e) {
        // Fallback to helvetica if font registration fails
        console.warn('Custom font registration failed; falling back to Helvetica.', e)
        this.fontFamily = 'helvetica'
      }
    }

    this.doc.setFont(this.fontFamily, 'normal')
  }

  /** Public API */
  async generateSessionPDF(session) {
    try {
      // Background (white) and header
      this.doc.setFillColor(255, 255, 255)
      this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F')

      this.addHeader(session)
      this.addSessionOverview(session)

      if (session.topics?.subject) this.addTopicsSection(session.topics)
      if (session.summary?.executive) this.addSummarySection(session.summary)
      if (session.progress) this.addProgressSection(session.progress)
      if (Array.isArray(session.quiz) && session.quiz.length) this.addQuizSection(session.quiz)

      this.addFooter()

      const filename = `${(session.title || 'session').replace(/[^\w-]+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      this.doc.save(filename)
      return { success: true, filename }
    } catch (err) {
      console.error('PDF generation failed:', err)
      return { success: false, error: err?.message || String(err) }
    }
  }

  // ---------- Layout helpers ----------

  sanitize(text) {
    if (typeof text !== 'string') return ''
    if (this.fontFamily !== 'NotoSans') {
      // Remove characters that built-in fonts can’t render (prevents �)
      // Replace common bullets/special dashes with safe ASCII
      return text
        .replace(/[•‣▪◦●]/g, '•') // keep a single bullet char
        .replace(/[–—]/g, '-')     // en/em dash -> hyphen
        .replace(/[“”„‟]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '') // strip leftovers
    }
    return text
  }

  ensureSpace(blockHeight) {
    const limit = this.pageHeight - this.bottomMargin
    if (this.y + blockHeight > limit) {
      this.doc.addPage()
      // reset background for new page
      this.doc.setFillColor(255, 255, 255)
      this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F')
      this.y = this.margin
    }
  }

  split(text, width = this.contentWidth, fontSize = this.bodySize) {
    this.doc.setFont(this.fontFamily, 'normal')
    this.doc.setFontSize(fontSize)
    return this.doc.splitTextToSize(this.sanitize(text), width)
  }

  addParagraph(text, opts = {}) {
    const {
      x = this.margin,
      width = this.contentWidth,
      size = this.bodySize,
      color = [0, 0, 0],
      style = 'normal',
      gapAfter = 4,
    } = opts

    const lines = this.split(text, width, size)
    const height = lines.length * this.lineHeight

    this.ensureSpace(height)

    this.doc.setTextColor(...color)
    this.doc.setFont(this.fontFamily, style)
    this.doc.setFontSize(size)

    lines.forEach((line) => {
      this.doc.text(line, x, this.y)
      this.y += this.lineHeight
    })
    this.y += gapAfter
  }

  addHeading(text, level = 2) {
    const map = {
      1: { size: this.h1Size, color: [255, 255, 255], style: 'bold', gap: 8 },
      2: { size: this.h2Size, color: [99, 102, 241], style: 'bold', gap: 8 },
      3: { size: this.h3Size, color: [0, 0, 0], style: 'bold', gap: 6 },
    }
    const cfg = map[level] || map[2]
    this.ensureSpace(this.lineHeight + 2)
    this.doc.setFont(this.fontFamily, cfg.style)
    this.doc.setFontSize(cfg.size)
    this.doc.setTextColor(...cfg.color)
    this.doc.text(this.sanitize(text), this.margin, this.y)
    this.y += this.lineHeight + (level === 1 ? 4 : 2)
  }

  addKeyValue(lines) {
    this.doc.setFont(this.fontFamily, 'normal')
    this.doc.setFontSize(this.bodySize)
    this.doc.setTextColor(0, 0, 0)

    lines.forEach((line) => {
      const content = this.sanitize(line)
      const h = this.lineHeight
      this.ensureSpace(h)
      this.doc.text(content, this.margin, this.y)
      this.y += h
    })
    this.y += this.sectionGap / 2
  }

  addBulletedList(items, opts = {}) {
    const {
      bullet = '•',
      indent = 6,
      textIndent = 4,
      width = this.contentWidth,
      color = [0, 0, 0],
      size = this.bodySize,
    } = opts

    items.filter(Boolean).forEach((item) => {
      const bulletX = this.margin
      const textX = this.margin + indent + textIndent
      const textWidth = width - indent - textIndent
      const lines = this.split(item, textWidth, size)

      // Height includes first line + subsequent wrapped lines
      const height = lines.length * this.lineHeight
      this.ensureSpace(height)

      this.doc.setTextColor(...color)
      this.doc.setFont(this.fontFamily, 'normal')
      this.doc.setFontSize(size)

      // bullet
      this.doc.text(this.sanitize(bullet), bulletX + indent, this.y)
      // first line
      this.doc.text(lines[0], textX, this.y)
      this.y += this.lineHeight
      // wrapped lines (indented)
      for (let i = 1; i < lines.length; i++) {
        this.doc.text(lines[i], textX, this.y)
        this.y += this.lineHeight
      }
    })
    this.y += 4
  }

  addOptionList(choices, answerIndex, opts = {}) {
    const {
      labelIndent = 6,
      wrapIndent = 10,
      width = this.contentWidth,
      size = this.bodySize,
    } = opts

    const baseX = this.margin
    const textX = baseX + labelIndent + wrapIndent
    const textWidth = width - labelIndent - wrapIndent

    choices.forEach((choice, i) => {
      if (!choice) return
      const label = String.fromCharCode(65 + i) + '.'
      const isCorrect = i === answerIndex

      const lines = this.split(choice, textWidth, size)
      const blockHeight = lines.length * this.lineHeight
      this.ensureSpace(blockHeight)

      // Label (shown once)
      this.doc.setFont(this.fontFamily, isCorrect ? 'bold' : 'normal')
      this.doc.setFontSize(size)
      this.doc.setTextColor(isCorrect ? 34 : 0, isCorrect ? 197 : 0, isCorrect ? 94 : 0)
      this.doc.text(label, baseX + labelIndent, this.y)

      // First line
      this.doc.text(lines[0], textX, this.y)
      this.y += this.lineHeight
      // Wrapped lines (aligned under text)
      this.doc.setFont(this.fontFamily, 'normal')
      this.doc.setTextColor(0, 0, 0)
      for (let k = 1; k < lines.length; k++) {
        this.doc.text(lines[k], textX, this.y)
        this.y += this.lineHeight
      }
    })
  }

  // ---------- Sections ----------

  addHeader(session) {
    // Banner
    this.doc.setFillColor(99, 102, 241)
    this.doc.rect(0, 0, this.pageWidth, this.headerHeight, 'F')

    // Title & subtitle
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFont(this.fontFamily, 'bold')
    this.doc.setFontSize(this.h1Size)
    this.doc.text('Epistemy', this.margin, 25)

    this.doc.setFontSize(this.h2Size)
    this.doc.text(this.sanitize(session.title || 'Session Report'), this.margin, 35)

    this.y = this.headerHeight + 10
  }

  addSessionOverview(session) {
    this.addHeading('Session Overview', 2)

    const kv = [
      `Title: ${session.title || 'Untitled'}`,
      `Created: ${session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'N/A'}`
    ]
    if (session.studentName && session.studentName.trim() !== '') {
      kv.push(`Student: ${session.studentName}`)
    }

    this.addKeyValue(kv)
  }

  addTopicsSection(topics) {
    this.addHeading('Topics Covered', 2)

    if (topics.subject) {
      this.addHeading(this.sanitize(topics.subject), 3)
      this.y += 2
    }

    if (Array.isArray(topics.subtopics)) {
      topics.subtopics.forEach((st, idx) => {
        if (!st?.title) return
        // Title
        this.addParagraph(`${idx + 1}. ${st.title}`, { size: this.bodySize + 1, style: 'bold', gapAfter: 2 })
        // Objective
        if (st.objective) {
          this.addParagraph(st.objective, { color: [80, 80, 80], gapAfter: 6 })
        }
      })
    }

    this.y += this.sectionGap / 2
  }

  addSummarySection(summary) {
    this.addHeading('Executive Summary', 2)

    if (summary.executive) this.addParagraph(summary.executive, { gapAfter: 6 })

    if (Array.isArray(summary.key_points) && summary.key_points.length) {
      this.addParagraph('Key Points:', { style: 'bold', gapAfter: 2 })
      this.addBulletedList(summary.key_points.map(s => this.sanitize(s)))
    }

    if (Array.isArray(summary.misconceptions) && summary.misconceptions.length) {
      this.addParagraph('Common Misconceptions:', { style: 'bold', gapAfter: 2 })
      this.addBulletedList(summary.misconceptions.map(s => this.sanitize(s)))
    }

    this.y += this.sectionGap / 2
  }

  addProgressSection(progress) {
    this.addHeading('Progress Evaluation', 2)

    if (Array.isArray(progress.improvements) && progress.improvements.length) {
      this.addParagraph('Improvements:', { style: 'bold', color: [34, 197, 94], gapAfter: 4 })
      this.addBulletedList(progress.improvements.map(s => this.sanitize(s)))
    }

    if (Array.isArray(progress.gaps) && progress.gaps.length) {
      this.addParagraph('Areas for Improvement:', { style: 'bold', color: [239, 68, 68], gapAfter: 4 })
      this.addBulletedList(progress.gaps.map(s => this.sanitize(s)))
    }

    if (Array.isArray(progress.nextGoals) && progress.nextGoals.length) {
      this.addParagraph('Next Goals:', { style: 'bold', color: [59, 130, 246], gapAfter: 4 })
      this.addBulletedList(progress.nextGoals.map(s => this.sanitize(s)))
    }

    this.y += this.sectionGap / 2
  }

  addQuizSection(quiz) {
    this.addHeading('Practice Quiz', 2)

    quiz.forEach((q, idx) => {
      // Question title
      this.addParagraph(`Question ${idx + 1}:`, { style: 'bold', gapAfter: 2 })
      if (q?.q) this.addParagraph(q.q, { gapAfter: 4 })

      if (Array.isArray(q?.choices)) {
        this.addOptionList(q.choices.map(s => this.sanitize(s)), q.answer_index)
      }

      if (q?.explanation) {
        this.addParagraph('Explanation:', { style: 'italic', color: [100, 100, 100], gapAfter: 1 })
        this.addParagraph(q.explanation, { color: [100, 100, 100], gapAfter: 6 })
      }

      this.y += 4
    })
  }

  addFooter() {
    const total = this.doc.internal.getNumberOfPages()
    for (let i = 1; i <= total; i++) {
      this.doc.setPage(i)

      // Divider
      this.doc.setDrawColor(200, 200, 200)
      this.doc.line(this.margin, this.pageHeight - this.bottomMargin + 5, this.pageWidth - this.margin, this.pageHeight - this.bottomMargin + 5)

      // Footer text
      this.doc.setFont(this.fontFamily, 'normal')
      this.doc.setFontSize(8)
      this.doc.setTextColor(100, 100, 100)
      this.doc.text('Generated by Epistemy AI Platform', this.margin, this.pageHeight - this.bottomMargin + 12)
      this.doc.text(`Page ${i} of ${total}`, this.pageWidth - this.margin - 25, this.pageHeight - this.bottomMargin + 12)
    }
  }
}

// Convenience export
export const generateSessionPDF = async (session, opts) => {
  const generator = new SessionPDFGenerator(opts)
  return await generator.generateSessionPDF(session)
}
