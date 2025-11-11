'use client'

import { useEffect } from 'react'

export default function SubscribePage() {
  useEffect(() => {
    // Script Lemon Squeezy
    const script = document.createElement('script')
    script.src = 'https://app.lemonsqueezy.com/js/lemon.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4" style={{ color: '#00D9FF' }}>
          Upgrade to Pro
        </h1>
        <p className="text-slate-400 mb-8">
          Unlimited boards, cloud sync, and more
        </p>

        {/* Înlocuiește YOUR-STORE și YOUR-PRODUCT-ID cu ale tale */}
        <a
          href="https://YOUR-STORE.lemonsqueezy.com/checkout/buy/YOUR-PRODUCT-ID"
          className="lemonsqueezy-button inline-block px-8 py-4 rounded-xl font-bold text-slate-900 text-lg"
          style={{ backgroundColor: '#00D9FF' }}
        >
          Subscribe - $9/month
        </a>
      </div>
    </div>
  )
}
