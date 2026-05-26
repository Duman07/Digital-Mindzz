// ============================================================
// DIGITAL MINDZ — Tipos globales de TypeScript
// ============================================================

export type UserRole = 'client' | 'admin'

export interface Profile {
  id:            string
  full_name:     string | null
  business_name: string | null
  phone:         string | null
  city:          string | null
  country:       string
  avatar_url:    string | null
  role:          UserRole
  created_at:    string
  updated_at:    string
}

export interface Service {
  id:            string
  slug:          string
  name:          string
  short_desc:    string
  description:   string | null
  icon:          string | null
  color:         string
  features:      string[]
  price_base:    number | null
  price_monthly: number | null
  category:      string
  is_active:     boolean
  sort_order:    number
  created_at:    string
}

export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type PlanType    = 'one_time' | 'monthly' | 'annual'

export interface OrderItem {
  id:           string
  order_id:     string
  service_id:   string
  service_name: string
  quantity:     number
  unit_price:   number
  total_price:  number
  plan_type:    PlanType
  created_at:   string
  service?:     Service
}

export interface Order {
  id:           string
  user_id:      string
  order_number: string
  status:       OrderStatus
  total_amount: number
  currency:     string
  notes:        string | null
  created_at:   string
  updated_at:   string
  items?:       OrderItem[]
  payments?:    Payment[]
}

export type PaymentGateway = 'wompi' | 'stripe' | 'manual'
export type PaymentStatus  = 'pending' | 'processing' | 'approved' | 'declined' | 'refunded' | 'error'

export interface Payment {
  id:                  string
  order_id:            string
  gateway:             PaymentGateway
  gateway_payment_id:  string | null
  gateway_status:      string | null
  amount:              number
  currency:            string
  payment_method:      string | null
  status:              PaymentStatus
  metadata:            Record<string, unknown>
  paid_at:             string | null
  created_at:          string
  updated_at:          string
}

// --- Carrito de compras ---
export interface CartItem {
  service:   Service
  quantity:  number
  plan_type: PlanType
  price:     number          // precio según plan elegido
}

export interface CartState {
  items:       CartItem[]
  total:       number
  itemCount:   number
}
