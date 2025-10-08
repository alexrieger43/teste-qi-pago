'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Brain, Clock, Trophy, Star, ChevronRight, Zap, Target, Award } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  type: 'logic' | 'math' | 'verbal' | 'pattern'
}

const questions: Question[] = [
  {
    id: 1,
    question: "Se todos os A são B, e todos os B são C, então:",
    options: ["Todos os A são C", "Alguns A são C", "Nenhum A é C", "Não é possível determinar"],
    correct: 0,
    type: 'logic'
  },
  {
    id: 2,
    question: "Qual número completa a sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1,
    type: 'math'
  },
  {
    id: 3,
    question: "LIVRO está para LEITURA assim como PIANO está para:",
    options: ["MÚSICA", "TECLAS", "INSTRUMENTO", "SOM"],
    correct: 0,
    type: 'verbal'
  },
  {
    id: 4,
    question: "Se 3x + 7 = 22, quanto vale x?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    type: 'math'
  },
  {
    id: 5,
    question: "Qual palavra não pertence ao grupo?",
    options: ["CARRO", "BICICLETA", "AVIÃO", "CASA"],
    correct: 3,
    type: 'verbal'
  },
  {
    id: 6,
    question: "Em uma sala há 4 gatos. Cada gato vê 3 gatos. Quantos gatos há na sala?",
    options: ["3", "4", "7", "12"],
    correct: 1,
    type: 'logic'
  },
  {
    id: 7,
    question: "Qual número vem a seguir: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "16"],
    correct: 1,
    type: 'math'
  },
  {
    id: 8,
    question: "Se CÓDIGO é escrito como DPEJHP, como seria escrito TESTE?",
    options: ["UFTUF", "SDRSD", "UFTUF", "UFSTF"],
    correct: 0,
    type: 'verbal'
  },
  {
    id: 9,
    question: "Um trem viaja 60 km em 45 minutos. Qual sua velocidade em km/h?",
    options: ["75", "80", "85", "90"],
    correct: 1,
    type: 'math'
  },
  {
    id: 10,
    question: "Se nem todos os pássaros voam, e alguns animais que voam não são pássaros, então:",
    options: ["Todos os animais voam", "Alguns pássaros não voam", "Nenhum pássaro voa", "Todos os pássaros voam"],
    correct: 1,
    type: 'logic'
  },
  {
    id: 11,
    question: "Qual é o próximo número na sequência: 3, 7, 15, 31, ?",
    options: ["47", "55", "63", "71"],
    correct: 2,
    type: 'math'
  },
  {
    id: 12,
    question: "Se A = 1, B = 2, C = 3... qual é o valor de CASA?",
    options: ["20", "21", "22", "23"],
    correct: 0,
    type: 'verbal'
  },
  {
    id: 13,
    question: "Em um grupo de 20 pessoas, 12 falam inglês e 8 falam francês. Se 3 não falam nenhum dos dois idiomas, quantas falam ambos?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    type: 'logic'
  },
  {
    id: 14,
    question: "Qual número é diferente dos outros?",
    options: ["16", "25", "36", "48"],
    correct: 3,
    type: 'math'
  },
  {
    id: 15,
    question: "MÉDICO está para HOSPITAL assim como PROFESSOR está para:",
    options: ["ALUNO", "ESCOLA", "LIVRO", "ENSINO"],
    correct: 1,
    type: 'verbal'
  },
  {
    id: 16,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correct: 0,
    type: 'logic'
  },
  {
    id: 17,
    question: "Qual é a raiz quadrada de 144?",
    options: ["10", "11", "12", "13"],
    correct: 2,
    type: 'math'
  },
  {
    id: 18,
    question: "Qual palavra pode ser formada com as letras de AMOR?",
    options: ["ROMA", "RAMO", "MORA", "Todas as anteriores"],
    correct: 3,
    type: 'verbal'
  },
  {
    id: 19,
    question: "Se 2 + 2 = 4 e 3 + 3 = 6, então 4 + 4 = ?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    type: 'logic'
  },
  {
    id: 20,
    question: "Qual é 15% de 200?",
    options: ["25", "30", "35", "40"],
    correct: 1,
    type: 'math'
  },
  {
    id: 21,
    question: "ÁGUA está para SEDE assim como COMIDA está para:",
    options: ["FOME", "PRATO", "MESA", "COZINHA"],
    correct: 0,
    type: 'verbal'
  },
  {
    id: 22,
    question: "Se todos os X são Y, e alguns Y são Z, então:",
    options: ["Todos os X são Z", "Alguns X são Z", "Nenhum X é Z", "Não é possível determinar"],
    correct: 3,
    type: 'logic'
  },
  {
    id: 23,
    question: "Qual número completa: 5, 10, 20, 40, ?",
    options: ["60", "70", "80", "90"],
    correct: 2,
    type: 'math'
  },
  {
    id: 24,
    question: "Qual palavra não pertence ao grupo: SOL, LUA, ESTRELA, NUVEM?",
    options: ["SOL", "LUA", "ESTRELA", "NUVEM"],
    correct: 3,
    type: 'verbal'
  },
  {
    id: 25,
    question: "Se um relógio marca 3:15, qual é o ângulo entre os ponteiros?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correct: 1,
    type: 'logic'
  },
  {
    id: 26,
    question: "Qual é o resultado de 7 × 8 - 6?",
    options: ["48", "50", "52", "54"],
    correct: 1,
    type: 'math'
  },
  {
    id: 27,
    question: "RÁPIDO está para DEVAGAR assim como ALTO está para:",
    options: ["BAIXO", "PEQUENO", "LENTO", "FRACO"],
    correct: 0,
    type: 'verbal'
  },
  {
    id: 28,
    question: "Se A > B e B > C, então:",
    options: ["A = C", "A < C", "A > C", "Não é possível determinar"],
    correct: 2,
    type: 'logic'
  },
  {
    id: 29,
    question: "Qual é o próximo número: 2, 4, 8, 16, ?",
    options: ["24", "28", "32", "36"],
    correct: 2,
    type: 'math'
  },
  {
    id: 30,
    question: "Qual palavra pode ser lida da mesma forma de trás para frente?",
    options: ["CASA", "ARARA", "MESA", "PORTA"],
    correct: 1,
    type: 'verbal'
  }
]

export default function Home() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutos
  const [testStarted, setTestStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [startTime, setStartTime] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  // Garantir que o componente está montado no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer
  useEffect(() => {
    if (mounted && testStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [mounted, testStarted, timeLeft])

  const startTest = () => {
    if (mounted) {
      setTestStarted(true)
      setShowInstructions(false)
      setStartTime(Date.now())
    }
  }

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        finishTest()
      }
    }
  }

  const finishTest = () => {
    if (!mounted) return
    
    const finalAnswers = [...answers]
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer
    }
    
    const score = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correct ? 1 : 0)
    }, 0)
    
    const timeUsed = startTime > 0 ? Math.floor((Date.now() - startTime) / 1000) : 900
    
    const result = {
      score,
      totalQuestions: questions.length,
      timeUsed,
      timestamp: new Date().toISOString()
    }
    
    try {
      localStorage.setItem('qiTestResult', JSON.stringify(result))
    } catch (error) {
      console.error('Erro ao salvar resultado:', error)
    }
    
    router.push('/resultado')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Não renderizar até estar montado no cliente
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Teste de QI Profissional
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra seu nível de inteligência com nosso teste cientificamente validado
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">30 Minutos</h3>
              <p className="text-gray-600">Tempo limite para completar todas as questões</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questões Selecionadas</h3>
              <p className="text-gray-600">Perguntas cuidadosamente selecionadas</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instruções do Teste</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-gray-700">Você terá <strong>30 minutos</strong> para responder todas as questões selecionadas</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-gray-700">Cada questão tem apenas <strong>uma resposta correta</strong></p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-gray-700">Não é possível voltar para questões anteriores</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <p className="text-gray-700">Se o tempo acabar, o teste será finalizado automaticamente</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <p className="text-gray-700">Mantenha o foco e responda com calma</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Dica Importante:</span>
              </div>
              <p className="text-yellow-700 mt-1">
                Leia cada questão com atenção e confie no seu primeiro instinto. 
                Questões não respondidas serão consideradas incorretas.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={startTest}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Brain className="h-6 w-6 mr-2" />
                Iniciar Teste de QI
                <ChevronRight className="h-6 w-6 ml-2" />
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                "Teste muito bem estruturado! Me ajudou a entender melhor minhas habilidades cognitivas."
              </p>
              <p className="text-sm text-gray-500">- Maria S., QI 128</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                "Resultado preciso e análise detalhada. Recomendo para todos!"
              </p>
              <p className="text-sm text-gray-500">- João P., QI 135</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!testStarted) return null

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header com Timer e Progresso */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teste de QI</h1>
                <p className="text-sm text-gray-600">
                  Questão {currentQuestion + 1} de {questions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className={`font-mono text-lg font-bold ${
                  timeLeft < 300 ? 'text-red-600' : 'text-gray-700'
                }`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Questão */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {currentQ.type === 'logic' && 'Raciocínio Lógico'}
                {currentQ.type === 'math' && 'Matemática'}
                {currentQ.type === 'verbal' && 'Habilidade Verbal'}
                {currentQ.type === 'pattern' && 'Padrões'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentQ.question}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)})</span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedAnswer !== null ? 'Resposta selecionada' : 'Selecione uma resposta'}
            </div>
            
            <button
              onClick={nextQuestion}
              disabled={selectedAnswer === null}
              className={`flex items-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finalizar Teste' : 'Próxima Questão'}
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Indicadores de Questões */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso das Questões</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < currentQuestion
                    ? 'bg-green-600 text-white'
                    : index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}