# 🚀 Ghid ULTRA-SIMPLU de Publicare

## Varianta CEA MAI UȘOARĂ: Lemon Squeezy + Vercel

### Pasul 1: Deploy pe Vercel (15 min)

1. **Creează cont GitHub** (dacă nu ai)
   - https://github.com/signup

2. **Creează repository nou**
   - https://github.com/new
   - Nume: `kanban-pro`
   - Public
   - Click "Create repository"

3. **Push codul pe GitHub**
   ```bash
   git remote add origin https://github.com/USERNAME/kanban-pro.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy pe Vercel**
   - Mergi la https://vercel.com/signup
   - Sign up cu GitHub
   - Click "New Project"
   - Import `kanban-pro`
   - Click "Deploy"
   - **GATA!** Primești URL: `https://kanban-pro-xyz.vercel.app`

---

### Pasul 2: Lemon Squeezy Plăți (15 min)

1. **Creează cont**
   - https://lemonsqueezy.com/signup
   - Completează datele companiei (SAU poți începe fără)

2. **Creează produsul**
   - Dashboard → Products → "New Product"
   - Name: "Kanban Pro Subscription"
   - Price: $9.00
   - Billing: Monthly
   - Click "Create"

3. **Copiază Payment Link**
   - Click pe produs
   - Copiază "Checkout URL"
   - Ar arăta așa: `https://yourstore.lemonsqueezy.com/checkout/buy/abc123`

4. **Pune link-ul în aplicație**
   - Deschide `app/subscribe/page.tsx`
   - Înlocuiește:
     ```typescript
     href="https://yourstore.lemonsqueezy.com/checkout/buy/abc123"
     ```

5. **Push update**
   ```bash
   git add .
   git commit -m "Add payment link"
   git push
   ```

   Vercel va face deploy automat!

---

### Pasul 3: Verificare Useri (Manual - Simplu)

**Când cineva plătește:**
1. Primești email de la Lemon Squeezy
2. Verifici în Dashboard → Sales
3. Ai email-ul clientului
4. Îi dai acces (manual sau automat)

**Automatizare simplă (opțional):**
- Lemon Squeezy → Webhooks → trimite email automat
- Sau folosește Zapier (no-code)

---

## 🎯 Varianta CU AUTOMATIZARE (2 ore)

Dacă vrei să fie 100% automat:

### Adaugă Supabase (Gratuit)

1. **Cont Supabase**
   - https://supabase.com
   - New Project: "kanban-pro"

2. **Creează tabel simplu**
   ```sql
   CREATE TABLE users (
     email TEXT PRIMARY KEY,
     is_paid BOOLEAN DEFAULT false,
     subscription_expires TIMESTAMP
   );
   ```

3. **Conectează cu Lemon Squeezy Webhook**
   - Lemon Squeezy → Webhooks
   - URL: `https://kanban-pro.vercel.app/api/webhook`
   - Events: `order_created`, `subscription_updated`

4. **API simplu** (deja creat în `app/api/checkout/route.ts`)

---

## 💰 Costuri Estimate

### Opțiunea 1: Lemon Squeezy (Cea mai simplă)
- **Setup:** GRATUIT
- **Per tranzacție:** 5% + processing fees
- **Exemplu:** Vânzare $9 → tu primești ~$8.40

### Opțiunea 2: Stripe + Vercel
- **Setup:** GRATUIT
- **Per tranzacție:** 2.9% + $0.30
- **Exemplu:** Vânzare $9 → tu primești ~$8.44

### Hosting (Vercel)
- **Gratuit** până la 100GB bandwidth
- **$20/lună** pentru comercial (opțional)

---

## 📊 Flow Complet

```
User vizitează → kanban-pro.vercel.app
        ↓
Vede pricing page
        ↓
Click "Subscribe $9/mo"
        ↓
Redirected → Lemon Squeezy Checkout
        ↓
Plătește cu card
        ↓
Lemon Squeezy → Email cu confirmare
        ↓
Tu primești notificare
        ↓
User primește acces
```

---

## 🔥 Quick Start (30 min)

**Ce ai nevoie:**
- ✅ GitHub account (gratuit)
- ✅ Vercel account (gratuit)
- ✅ Lemon Squeezy account (gratuit)

**Pași rapizi:**
1. Push pe GitHub (5 min)
2. Deploy Vercel (5 min)
3. Setup Lemon Squeezy (10 min)
4. Test purchase (5 min)
5. Share link (1 min)

**DONE!** 🎉

---

## 🆘 Probleme Comune

**Q: Trebuie să am firmă?**
A: Nu pentru început. Lemon Squeezy acceptă și persoane fizice.

**Q: Cum primesc banii?**
A: Lemon Squeezy → Payout la 14 zile → Contul tău bancar (sau PayPal)

**Q: Ce taxe plătesc?**
A: Lemon Squeezy se ocupă de taxe automat (VAT/TVA)

**Q: Pot testa fără card real?**
A: Da! Stripe/Lemon Squeezy au Test Mode

**Q: Cât costă hostingul?**
A: Vercel = GRATUIT pentru proiecte mici

---

## 🎯 Next Steps După Launch

1. ✅ Testează fluxul complet
2. ✅ Promovează pe social media
3. ✅ Adaugă testimoniale
4. ✅ Setup email marketing (Mailchimp gratuit până la 500 useri)
5. ✅ Analytics (Vercel Analytics gratuit)

---

## 📞 Link-uri Utile

- Deploy: https://vercel.com
- Plăți: https://lemonsqueezy.com
- Database: https://supabase.com
- Email: https://mailchimp.com
- Analytics: https://vercel.com/analytics
