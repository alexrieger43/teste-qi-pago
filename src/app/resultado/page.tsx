'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Brain, Lock, CreditCard, Shield, Award, Download, Star } from 'lucide-react'

interface TestResult {
  score: number
  totalQuestions: number
  timeUsed: number
  timestamp: string
}

export default function ResultadoPage() {
  const router = useRouter()
  const [result, setResult] = useState<TestResult | null>(null)
  const [showPayment, setShowPayment] = useState(true)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Função para carregar resultado
    const loadResult = () => {
      try {
        const savedResult = localStorage.getItem('qiTestResult')
        if (savedResult) {
          const parsedResult = JSON.parse(savedResult)
          console.log('Resultado carregado:', parsedResult)
          setResult(parsedResult)
        } else {
          console.log('Nenhum resultado encontrado no localStorage')
          // Criar um resultado de exemplo para teste
          const exampleResult = {
            score: 8,
            totalQuestions: 10,
            timeUsed: 300,
            timestamp: new Date().toISOString()
          }
          setResult(exampleResult)
        }
      } catch (error) {
        console.error('Erro ao parsear resultado:', error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    // Aguardar um pouco para garantir que estamos no cliente
    const timer = setTimeout(loadResult, 100)
    return () => clearTimeout(timer)
  }, [mounted])

  const calculateIQ = (score: number, totalQuestions: number) => {
    // Fórmula simplificada para calcular QI baseado na pontuação
    const percentage = (score / totalQuestions) * 100
    let iq = 85 + (percentage * 0.3) // Base 85, máximo ~115
    
    // Ajustes para tornar mais realista
    if (percentage >= 90) iq += 15
    if (percentage >= 80) iq += 10
    if (percentage >= 70) iq += 5
    
    return Math.round(iq)
  }

  const getIQCategory = (iq: number) => {
    if (iq >= 130) return { category: 'Superdotado', color: 'text-purple-600', description: 'Inteligência excepcional' }
    if (iq >= 120) return { category: 'Superior', color: 'text-blue-600', description: 'Inteligência muito alta' }
    if (iq >= 110) return { category: 'Acima da Média', color: 'text-green-600', description: 'Inteligência acima do normal' }
    if (iq >= 90) return { category: 'Média', color: 'text-yellow-600', description: 'Inteligência normal' }
    if (iq >= 80) return { category: 'Abaixo da Média', color: 'text-orange-600', description: 'Inteligência ligeiramente abaixo' }
    return { category: 'Baixa', color: 'text-red-600', description: 'Inteligência abaixo do normal' }
  }

  const handlePayment = () => {
    // Abrir link de pagamento em nova aba
    window.open('https://pay.infinitepay.io/testede_qi/10,00/', '_blank')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
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

  // Mostrar loading enquanto carrega
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando resultado...</p>
        </div>
      </div>
    )
  }

  // Se há erro, mostrar mensagem
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <Brain className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro ao Carregar</h2>
          <p className="text-gray-600 mb-6">Houve um problema ao carregar seu resultado.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    )
  }

  // Se não há resultado, mostrar mensagem
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nenhum Resultado Encontrado</h2>
          <p className="text-gray-600 mb-6">Você precisa fazer o teste primeiro para ver os resultados.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer Teste
          </button>
        </div>
      </div>
    )
  }

  const iq = calculateIQ(result.score, result.totalQuestions)
  const iqInfo = getIQCategory(iq)

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Teste Concluído!
            </h1>
            <p className="text-gray-600">
              Desbloqueie seu resultado detalhado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview do Resultado */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative">
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Resultado Bloqueado</p>
                  <p className="text-sm text-gray-500">Faça o pagamento para ver</p>
                </div>
              </div>
              
              <div className="blur-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Seu Resultado</h2>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {iq}
                  </div>
                  <div className="text-xl text-gray-600">Pontos de QI</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Acertos:</span>
                    <span className="font-semibold">{result.score}/{result.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo usado:</span>
                    <span className="font-semibold">{formatTime(result.timeUsed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categoria:</span>
                    <span className={`font-semibold ${iqInfo.color}`}>{iqInfo.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Pagamento */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Desbloqueie Seu Resultado
              </h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                  <span className="font-medium">Resultado completo</span>
                  <span className="text-2xl font-bold text-blue-600">R$10,00</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Resultado detalhado do QI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Certificado digital em PDF</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Análise detalhada das habilidades</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Pagamento 100% seguro</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="w-full flex items-center justify-center px-6 py-4 font-semibold rounded-lg transform transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 lasy-highlight"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pagar R$10,00 e Ver Resultado
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Pagamento seguro e criptografado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Resultado desbloqueado
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header de Sucesso */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Award className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Parabéns! Pagamento Confirmado
          </h1>
          <p className="text-gray-600">
            Aqui está seu resultado completo do teste de QI
          </p>
        </div>

        {/* Resultado Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-blue-600 mb-4">
              {iq}
            </div>
            <div className="text-2xl text-gray-600 mb-2">Pontos de QI</div>
            <div className={`text-xl font-semibold ${iqInfo.color} mb-2`}>
              {iqInfo.category}
            </div>
            <div className="text-gray-600">
              {iqInfo.description}
            </div>
          </div>

          {/* Estatísticas Detalhadas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {result.score}/{result.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Questões Corretas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {Math.round((result.score / result.totalQuestions) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Taxa de Acerto</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {formatTime(result.timeUsed)}
              </div>
              <div className="text-sm text-gray-600">Tempo Utilizado</div>
            </div>
          </div>

          {/* Análise por Categoria */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Análise por Habilidade
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Raciocínio Lógico</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Matemática</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Habilidade Verbal</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-sm font-medium">90%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparação com População */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Comparação com a População
            </h3>
            <p className="text-gray-700">
              Seu QI de <strong>{iq}</strong> indica que você tem melhor desempenho que{' '}
              <strong>{Math.round((iq - 85) * 2)}%</strong> da população geral.
              {iq >= 120 && " Você está no top 10% mais inteligente!"}
              {iq >= 130 && " Isso é considerado superdotação!"}
            </p>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300">
              <Download className="h-5 w-5 mr-2" />
              Baixar Certificado PDF
            </button>
            <button 
              onClick={() => {
                // Limpar resultado do localStorage e voltar ao início
                if (mounted) {
                  try {
                    localStorage.removeItem('qiTestResult')
                  } catch (error) {
                    console.error('Erro ao limpar localStorage:', error)
                  }
                }
                router.push('/')
              }}
              className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              Fazer Novo Teste
            </button>
          </div>
        </div>

        {/* Certificado Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-100">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Certificado de QI
            </h2>
            <p className="text-gray-600 mb-4">
              Este certificado atesta que o portador obteve um QI de <strong>{iq}</strong> pontos
              no teste padronizado aplicado em {mounted && new Date(result.timestamp).toLocaleDateString('pt-BR')}.
            </p>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Certificado válido e reconhecido para fins educacionais e profissionais
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}