import jsPDF from 'jspdf'

export class SessionPDFGenerator {
  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4')
    this.margin = 20
    this.pageWidth = 210
    this.contentWidth = this.pageWidth - (this.margin * 2)
    this.yPosition = this.margin
    this.lineHeight = 7
    this.sectionSpacing = 10
  }

  async generateSessionPDF(session) {
    try {
      console.log('PDF Generation - Session data:', session)
      
      // Set up the document
      this.doc.setFillColor(255, 255, 255) // White background
      this.doc.rect(0, 0, this.pageWidth, 297, 'F')
      
      // Add header
      this.addHeader(session)
      
      // Add session overview
      this.addSessionOverview(session)
      
      // Add topics if available
      if (session.topics && session.topics.subject) {
        this.addTopicsSection(session.topics)
      }
      
      // Add summary if available
      if (session.summary && session.summary.executive) {
        this.addSummarySection(session.summary)
      }
      
      // Add progress if available
      if (session.progress) {
        this.addProgressSection(session.progress)
      }
      
      // Add quiz if available
      if (session.quiz && Array.isArray(session.quiz) && session.quiz.length > 0) {
        this.addQuizSection(session.quiz)
      }
      
      // Add footer
      this.addFooter()
      
      // Save the PDF
      const filename = `${session.title || 'session'}_${new Date().toISOString().split('T')[0]}.pdf`
      this.doc.save(filename)
      
      return { success: true, filename }
    } catch (error) {
      console.error('PDF generation failed:', error)
      return { success: false, error: error.message }
    }
  }

  addHeader(session) {
    // Header background
    this.doc.setFillColor(99, 102, 241)
    this.doc.rect(0, 0, this.pageWidth, 40, 'F')
    
    // Header text
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(24)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Epistemy', this.margin, 25)
    
    this.doc.setFontSize(16)
    this.doc.text(session.title || 'Session Report', this.margin, 35)
    
    this.yPosition = 50
  }

  addSessionOverview(session) {
    this.addSectionTitle('Session Overview')
    
    const overview = [
      `Title: ${session.title || 'Untitled'}`,
      `Status: ${session.status || 'Draft'}`,
      `Created: ${session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'N/A'}`,
      `Student: ${session.studentName || (session.studentId ? 'Assigned' : 'Unassigned')}`
    ]
    
    this.doc.setFontSize(10)
    this.doc.setTextColor(0, 0, 0)
    overview.forEach(line => {
      this.doc.text(line, this.margin, this.yPosition)
      this.yPosition += this.lineHeight
    })
    
    this.yPosition += this.sectionSpacing
  }

  addTopicsSection(topics) {
    this.addSectionTitle('Topics Covered')
    
    if (topics.subject) {
      this.doc.setFontSize(12)
      this.doc.setFont('helvetica', 'bold')
      this.doc.setTextColor(99, 102, 241)
      this.doc.text(topics.subject, this.margin, this.yPosition)
      this.yPosition += this.lineHeight + 5
    }
    
    if (topics.subtopics && Array.isArray(topics.subtopics)) {
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')
      this.doc.setTextColor(0, 0, 0)
      
      topics.subtopics.forEach((subtopic, index) => {
        if (subtopic.title) {
          // Check for new page
          if (this.yPosition > 250) {
            this.doc.addPage()
            this.yPosition = this.margin
          }
          
          this.doc.setFont('helvetica', 'bold')
          this.doc.text(`${index + 1}. ${subtopic.title}`, this.margin, this.yPosition)
          this.yPosition += this.lineHeight
          
          if (subtopic.objective) {
            this.doc.setFont('helvetica', 'normal')
            this.doc.setTextColor(100, 100, 100)
            const wrappedText = this.wrapText(subtopic.objective, this.contentWidth - 20)
            wrappedText.forEach(line => {
              this.doc.text(line, this.margin + 10, this.yPosition)
              this.yPosition += this.lineHeight
            })
            this.yPosition += 3
          }
        }
      })
    }
    
    this.yPosition += this.sectionSpacing
  }

  addSummarySection(summary) {
    this.addSectionTitle('Executive Summary')
    
    if (summary.executive) {
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')
      this.doc.setTextColor(0, 0, 0)
      
      const wrappedText = this.wrapText(summary.executive, this.contentWidth)
      wrappedText.forEach(line => {
        if (this.yPosition > 250) {
          this.doc.addPage()
          this.yPosition = this.margin
        }
        this.doc.text(line, this.margin, this.yPosition)
        this.yPosition += this.lineHeight
      })
      this.yPosition += 10
    }
    
    if (summary.key_points && Array.isArray(summary.key_points)) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('Key Points:', this.margin, this.yPosition)
      this.yPosition += this.lineHeight + 5
      
      this.doc.setFont('helvetica', 'normal')
      summary.key_points.forEach(point => {
        if (point) {
          if (this.yPosition > 250) {
            this.doc.addPage()
            this.yPosition = this.margin
          }
          this.doc.text(`• ${point}`, this.margin + 10, this.yPosition)
          this.yPosition += this.lineHeight + 2
        }
      })
      this.yPosition += 5
    }
    
    if (summary.misconceptions && Array.isArray(summary.misconceptions)) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('Common Misconceptions:', this.margin, this.yPosition)
      this.yPosition += this.lineHeight + 5
      
      this.doc.setFont('helvetica', 'normal')
      summary.misconceptions.forEach(misconception => {
        if (misconception) {
          if (this.yPosition > 250) {
            this.doc.addPage()
            this.yPosition = this.margin
          }
          this.doc.text(`• ${misconception}`, this.margin + 10, this.yPosition)
          this.yPosition += this.lineHeight + 2
        }
      })
    }
    
    this.yPosition += this.sectionSpacing
  }

  addProgressSection(progress) {
    this.addSectionTitle('Progress Evaluation')
    
    if (progress.improvements && Array.isArray(progress.improvements) && progress.improvements.length > 0) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.setTextColor(34, 197, 94)
      this.doc.text('Improvements:', this.margin, this.yPosition)
      this.yPosition += this.lineHeight + 5
      
      this.doc.setFont('helvetica', 'normal')
      this.doc.setTextColor(0, 0, 0)
      progress.improvements.forEach(improvement => {
        if (improvement) {
          if (this.yPosition > 250) {
            this.doc.addPage()
            this.yPosition = this.margin
          }
          this.doc.text(`• ${improvement}`, this.margin + 10, this.yPosition)
          this.yPosition += this.lineHeight + 2
        }
      })
      this.yPosition += 5
    }
    
    if (progress.gaps && Array.isArray(progress.gaps) && progress.gaps.length > 0) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.setTextColor(239, 68, 68)
      this.doc.text('Areas for Improvement:', this.margin, this.yPosition)
      this.yPosition += this.lineHeight + 5
      
      this.doc.setFont('helvetica', 'normal')
      this.doc.setTextColor(0, 0, 0)
      progress.gaps.forEach(gap => {
        if (gap) {
          if (this.yPosition > 250) {
            this.doc.addPage()
            this.yPosition = this.margin
          }
          this.doc.text(`• ${gap}`, this.margin + 10, this.yPosition)
          this.yPosition += this.lineHeight + 2
        }
      })
      this.yPosition += 5
    }
    
    if (progress.nextGoals && Array.isArray(progress.nextGoals) && progress.nextGoals.length > 0) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.setTextColor(59, 130, 246)
      this.doc.text('Next Goals:', this.margin, this.yPosition)
      this.yPosition += this.lineHeight + 5
      
      this.doc.setFont('helvetica', 'normal')
      this.doc.setTextColor(0, 0, 0)
      progress.nextGoals.forEach(goal => {
        if (goal) {
          if (this.yPosition > 250) {
            this.doc.addPage()
            this.yPosition = this.margin
          }
          this.doc.text(`• ${goal}`, this.margin + 10, this.yPosition)
          this.yPosition += this.lineHeight + 2
        }
      })
    }
    
    this.yPosition += this.sectionSpacing
  }

  addQuizSection(quiz) {
    this.addSectionTitle('Practice Quiz')
    
    quiz.forEach((question, index) => {
      if (this.yPosition > 200) {
        this.doc.addPage()
        this.yPosition = this.margin
      }
      
      this.doc.setFont('helvetica', 'bold')
      this.doc.setTextColor(0, 0, 0)
      this.doc.text(`Question ${index + 1}:`, this.margin, this.yPosition)
      this.yPosition += this.lineHeight
      
      if (question.q) {
        this.doc.setFont('helvetica', 'normal')
        const wrappedQuestion = this.wrapText(question.q, this.contentWidth - 20)
        wrappedQuestion.forEach(line => {
          this.doc.text(line, this.margin + 10, this.yPosition)
          this.yPosition += this.lineHeight
        })
        this.yPosition += 3
      }
      
      if (question.choices && Array.isArray(question.choices)) {
        question.choices.forEach((choice, choiceIndex) => {
          if (choice) {
            const isCorrect = choiceIndex === question.answer_index
            this.doc.setTextColor(isCorrect ? 34 : 0, isCorrect ? 197 : 0, isCorrect ? 94 : 0)
            this.doc.setFont('helvetica', isCorrect ? 'bold' : 'normal')
            
            const choiceText = `${String.fromCharCode(65 + choiceIndex)}. ${choice}`
            this.doc.text(choiceText, this.margin + 20, this.yPosition)
            this.yPosition += this.lineHeight + 1
          }
        })
      }
      
      if (question.explanation) {
        this.yPosition += 3
        this.doc.setTextColor(100, 100, 100)
        this.doc.setFont('helvetica', 'italic')
        this.doc.text('Explanation:', this.margin + 10, this.yPosition)
        this.yPosition += this.lineHeight
        
        this.doc.setFont('helvetica', 'normal')
        const wrappedExplanation = this.wrapText(question.explanation, this.contentWidth - 30)
        wrappedExplanation.forEach(line => {
          this.doc.text(line, this.margin + 20, this.yPosition)
          this.yPosition += this.lineHeight
        })
      }
      
      this.yPosition += 10
    })
  }

  addSectionTitle(title) {
    if (this.yPosition > 250) {
      this.doc.addPage()
      this.yPosition = this.margin
    }
    
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(99, 102, 241)
    this.doc.text(title, this.margin, this.yPosition)
    this.yPosition += this.lineHeight + 8
  }

  addFooter() {
    const pageCount = this.doc.internal.getNumberOfPages()
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i)
      
      // Footer line
      this.doc.setDrawColor(200, 200, 200)
      this.doc.line(this.margin, 280, this.pageWidth - this.margin, 280)
      
      // Footer text
      this.doc.setFontSize(8)
      this.doc.setTextColor(100, 100, 100)
      this.doc.text('Generated by Epistemy AI Platform', this.margin, 285)
      this.doc.text(`Page ${i} of ${pageCount}`, this.pageWidth - this.margin - 25, 285)
    }
  }

  wrapText(text, maxWidth) {
    if (!text) return ['']
    
    const words = text.split(' ')
    const lines = []
    let currentLine = ''
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const testWidth = this.doc.getTextWidth(testLine)
      
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    
    if (currentLine) {
      lines.push(currentLine)
    }
    
    return lines.length > 0 ? lines : ['']
  }
}

// Export a simple function for easy use
export const generateSessionPDF = async (session) => {
  const generator = new SessionPDFGenerator()
  return await generator.generateSessionPDF(session)
}
