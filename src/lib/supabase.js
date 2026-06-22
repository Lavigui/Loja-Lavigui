import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltam as variáveis de ambiente do Supabase.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper para montar as URLs otimizadas das imagens do Cloudinary
export function getCloudinaryUrl(publicId) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
  if (!publicId) return 'https://placehold.co/600x800?text=Sem+Imagem'
  
  // Se já for uma URL completa, retorna ela mesma
  if (publicId.startsWith('http')) return publicId
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${publicId}`
}

// Helper para buscar dados de uma tabela genérica
export async function fetchTable(tableName) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
  
  if (error) {
    console.error(`Erro ao buscar dados da tabela ${tableName}:`, error)
    return []
  }
  return data
}

// Helper para buscar produtos filtrados por marca
export async function fetchProdutosComMarca() {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      *,
      marcas (
        id,
        nome,
        slug
      )
    `)
    
  if (error) {
    console.error('Erro ao buscar produtos com marcas:', error)
    return []
  }
  return data
}
