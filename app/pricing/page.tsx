'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for trying out Kanban Pro',
    features: [
      '1 board',
      'Up to 10 tasks',
      'Basic drag & drop',
      'Local storage only',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '9',
    description: 'Best for individuals and small teams',
    features: [
      'Unlimited boards',
      'Unlimited tasks',
      'Cloud sync',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
  },
  {
    name: 'Enterprise',
    price: '29',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SSO authentication',
      'Advanced security',
      'Custom training',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function PricingPage() {
  const router = useRouter()

  const handleSubscribe = async (priceId?: string) => {
    if (!priceId) {
      router.push('/sign-up')
      return
    }

    // Redirect to checkout
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })

    const { url } = await response.json()
    if (url) {
      window.location.href = url
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <Sparkles className="w-4 h-4" style={{ color: '#00D9FF' }} />
          <span className="text-sm font-medium text-slate-300">Simple, transparent pricing</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black mb-4"
          style={{ color: '#00D9FF' }}
        >
          Choose Your Plan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto"
        >
          Start free, upgrade when you're ready. Cancel anytime.
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative glass-strong rounded-2xl p-8 border ${
              plan.highlighted
                ? 'border-[#00D9FF] ring-2 ring-[#00D9FF]/20'
                : 'border-white/10'
            }`}
          >
            {plan.highlighted && (
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-slate-900"
                style={{ backgroundColor: '#00D9FF' }}
              >
                MOST POPULAR
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-400">{plan.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">${plan.price}</span>
                <span className="text-slate-400">/month</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubscribe(plan.priceId)}
              className={`w-full py-3 rounded-xl font-bold transition-all mb-8 ${
                plan.highlighted
                  ? 'text-slate-900'
                  : 'text-white glass border border-white/10'
              }`}
              style={plan.highlighted ? { backgroundColor: '#00D9FF' } : {}}
            >
              {plan.cta}
            </motion.button>

            <ul className="space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00D9FF' }} />
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* FAQ or Additional Info */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <p className="text-slate-400">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  )
}
