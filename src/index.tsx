import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database
  JWT_SECRET: string
  ADMIN_PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

// Public pages
app.get('/', async (c) => {
  return c.render(
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Rain animation container */}
      <div class="rain-container"></div>
      
      {/* Navigation */}
      <nav class="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-light tracking-wide text-gray-800">DVけむし</h1>
            </div>
            <div class="flex items-center space-x-8">
              <a href="/" class="text-gray-700 hover:text-gray-900 transition">Home</a>
              <a href="/portfolio" class="text-gray-700 hover:text-gray-900 transition">Portfolio</a>
              <a href="/pricing" class="text-gray-700 hover:text-gray-900 transition">Pricing</a>
              <a href="/contact" class="text-gray-700 hover:text-gray-900 transition">Contact</a>
              <a href="/admin" class="text-gray-500 hover:text-gray-700 transition text-sm">
                <i class="fas fa-lock"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <div class="space-y-8">
            <h1 class="text-5xl sm:text-6xl font-thin text-gray-800 tracking-wider animate-fade-in">
              DVけむし
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 font-light">
              映像師 / Motion Graphics Designer
            </p>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              ボカロ曲や歌ってみた動画のイラストMV、リリックモーション制作
            </p>
            <div class="pt-8">
              <a href="/portfolio" class="inline-block px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 shadow-lg">
                作品を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-light text-gray-800 text-center mb-12">Services</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <div class="text-4xl mb-4 text-gray-700">
                <i class="fas fa-video"></i>
              </div>
              <h3 class="text-xl font-light mb-3">イラストMV制作</h3>
              <p class="text-gray-600">ボカロ曲や歌ってみた動画に映像を付けて、作品の世界観を視覚的に表現します</p>
            </div>
            <div class="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <div class="text-4xl mb-4 text-gray-700">
                <i class="fas fa-music"></i>
              </div>
              <h3 class="text-xl font-light mb-3">リリックモーション</h3>
              <p class="text-gray-600">歌詞をアニメーションで魅せる、印象的なリリックビデオを制作します</p>
            </div>
            <div class="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <div class="text-4xl mb-4 text-gray-700">
                <i class="fas fa-film"></i>
              </div>
              <h3 class="text-xl font-light mb-3">映像演出</h3>
              <p class="text-gray-600">楽曲の雰囲気に合わせた映像演出で、視聴者の心に残る作品を創り上げます</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Works Preview */}
      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-light text-gray-800 text-center mb-12">Recent Works</h2>
          <div id="recent-works" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Works will be loaded dynamically */}
            <div class="bg-gray-100 rounded-lg overflow-hidden shadow-md animate-pulse">
              <div class="aspect-video bg-gray-200"></div>
              <div class="p-4">
                <div class="h-4 bg-gray-200 rounded mb-2"></div>
                <div class="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          <div class="text-center mt-8">
            <a href="/portfolio" class="text-gray-600 hover:text-gray-800 transition">
              すべての作品を見る →
            </a>
          </div>
        </div>
      </section>

      {/* Twitter Timeline Section */}
      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-light text-gray-800 text-center mb-12">Latest Updates</h2>
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <div class="twitter-timeline-container">
              <a class="twitter-timeline" 
                 data-height="400"
                 data-theme="light"
                 href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">
                Latest tweets
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="relative z-10 bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <p class="mb-4">© 2024 DVけむし. All rights reserved.</p>
          <div class="space-x-4">
            <a href="https://twitter.com/DVkemushi" target="_blank" class="hover:text-gray-300 transition">
              <i class="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://youtube.com/@DVkemushi" target="_blank" class="hover:text-gray-300 transition">
              <i class="fab fa-youtube"></i> YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>,
    { title: 'DVけむし - 映像師 / Motion Graphics Designer' }
  )
})

// Portfolio page
app.get('/portfolio', async (c) => {
  return c.render(
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <div class="rain-container"></div>
      
      <nav class="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-xl font-light tracking-wide text-gray-800">DVけむし</a>
            </div>
            <div class="flex items-center space-x-8">
              <a href="/" class="text-gray-700 hover:text-gray-900 transition">Home</a>
              <a href="/portfolio" class="text-gray-900 font-medium">Portfolio</a>
              <a href="/pricing" class="text-gray-700 hover:text-gray-900 transition">Pricing</a>
              <a href="/contact" class="text-gray-700 hover:text-gray-900 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-light text-gray-800 text-center mb-12">Portfolio</h1>
          
          <div class="mb-8 text-center">
            <div class="inline-flex space-x-4">
              <button class="px-4 py-2 bg-gray-800 text-white rounded-full" data-filter="all">All</button>
              <button class="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100" data-filter="mv">MV</button>
              <button class="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100" data-filter="lyric">Lyric</button>
            </div>
          </div>

          <div id="portfolio-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Portfolio items will be loaded dynamically */}
          </div>
          
          <div class="mt-12 text-center">
            <h3 class="text-xl font-light mb-4 text-gray-700">最新作品をシェアする</h3>
            <div class="flex justify-center space-x-4">
              <a href="https://twitter.com/intent/tweet?text=DVけむしの最新作品をチェック！&url=https://dvkemushi.pages.dev/portfolio" 
                 target="_blank"
                 class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                <i class="fab fa-twitter mr-2"></i>
                Twitterでシェア
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: 'Portfolio - DVけむし' }
  )
})

// Pricing page
app.get('/pricing', async (c) => {
  return c.render(
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <div class="rain-container"></div>
      
      <nav class="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-xl font-light tracking-wide text-gray-800">DVけむし</a>
            </div>
            <div class="flex items-center space-x-8">
              <a href="/" class="text-gray-700 hover:text-gray-900 transition">Home</a>
              <a href="/portfolio" class="text-gray-700 hover:text-gray-900 transition">Portfolio</a>
              <a href="/pricing" class="text-gray-900 font-medium">Pricing</a>
              <a href="/contact" class="text-gray-700 hover:text-gray-900 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-light text-gray-800 text-center mb-12">料金・制作の流れ</h1>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-light mb-6">料金について</h2>
            <div class="space-y-4 text-gray-700">
              <div class="flex items-start">
                <i class="fas fa-yen-sign mt-1 mr-3 text-gray-500"></i>
                <div>
                  <p class="font-medium">基本料金</p>
                  <p>10,000円〜 （内容により変動）</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-calendar-alt mt-1 mr-3 text-gray-500"></i>
                <div>
                  <p class="font-medium">納期</p>
                  <p>4週間（標準）</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-credit-card mt-1 mr-3 text-gray-500"></i>
                <div>
                  <p class="font-medium">支払い方法</p>
                  <p>PayPal / 銀行振込 / その他要相談</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-file-contract mt-1 mr-3 text-gray-500"></i>
                <div>
                  <p class="font-medium">著作権</p>
                  <p>著作権譲渡なし（納品した映像を実績として利用する場合があります）</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-light mb-6">制作の流れ</h2>
            <ol class="space-y-6">
              <li class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div class="ml-4">
                  <p class="font-medium">素材の受け取り</p>
                  <p class="text-gray-600">イラスト・音源をいただきます</p>
                </div>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div class="ml-4">
                  <p class="font-medium">制作開始</p>
                  <p class="text-gray-600">1サビ終わりまで制作</p>
                </div>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div class="ml-4">
                  <p class="font-medium">方向性確認</p>
                  <p class="text-gray-600">制作したものを共有し、調整・微修正</p>
                </div>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">4</span>
                <div class="ml-4">
                  <p class="font-medium">フルパート制作</p>
                  <p class="text-gray-600">透かし付きで共有</p>
                </div>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">5</span>
                <div class="ml-4">
                  <p class="font-medium">最終調整</p>
                  <p class="text-gray-600">必要に応じて調整・微修正</p>
                </div>
              </li>
              <li class="flex">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm">6</span>
                <div class="ml-4">
                  <p class="font-medium">納品</p>
                  <p class="text-gray-600">お支払い確認後、透かしなしで納品（MP4形式・FullHD）</p>
                </div>
              </li>
            </ol>
          </div>

          <div class="mt-8 text-center">
            <a href="/contact" class="inline-block px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 shadow-lg">
              お問い合わせ・ご依頼
            </a>
          </div>
        </div>
      </section>
    </div>,
    { title: '料金・制作の流れ - DVけむし' }
  )
})

// Contact page
app.get('/contact', async (c) => {
  return c.render(
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <div class="rain-container"></div>
      
      <nav class="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-xl font-light tracking-wide text-gray-800">DVけむし</a>
            </div>
            <div class="flex items-center space-x-8">
              <a href="/" class="text-gray-700 hover:text-gray-900 transition">Home</a>
              <a href="/portfolio" class="text-gray-700 hover:text-gray-900 transition">Portfolio</a>
              <a href="/pricing" class="text-gray-700 hover:text-gray-900 transition">Pricing</a>
              <a href="/contact" class="text-gray-900 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto">
          <h1 class="text-4xl font-light text-gray-800 text-center mb-12">Contact</h1>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <form id="contact-form" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">お名前</label>
                <input type="text" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">依頼内容</label>
                <select name="type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <option value="mv">イラストMV制作</option>
                  <option value="lyric">リリックモーション制作</option>
                  <option value="other">その他</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">詳細</label>
                <textarea name="message" rows="5" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
              </div>
              
              <button type="submit" class="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300">
                送信する
              </button>
            </form>
          </div>

          <div class="mt-8 text-center text-gray-600">
            <p>日本全国対応</p>
            <p class="mt-2">個人・企業問わず承っております</p>
          </div>
        </div>
      </section>
    </div>,
    { title: 'Contact - DVけむし' }
  )
})

// Admin login page
app.get('/admin', async (c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div class="rain-container"></div>
      
      <div class="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-light text-center mb-6">管理者ログイン</h2>
        
        <form id="admin-login-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
            <input type="password" name="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
          </div>
          
          <button type="submit" class="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300">
            ログイン
          </button>
        </form>
        
        <div class="mt-4 text-center">
          <a href="/" class="text-sm text-gray-500 hover:text-gray-700">← ホームに戻る</a>
        </div>
      </div>
    </div>,
    { title: '管理者ログイン - DVけむし' }
  )
})

// Admin dashboard (protected)
app.get('/admin/dashboard', async (c) => {
  // JWT verification would be here
  return c.render(
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-gray-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-light">管理画面</h1>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" target="_blank" class="hover:text-gray-300">サイトを見る</a>
              <button id="logout-btn" class="hover:text-gray-300">ログアウト</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-light mb-6">作品管理</h2>
        
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <h3 class="text-lg font-medium mb-4">新規作品追加</h3>
          <form id="add-work-form" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                <input type="text" name="title" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">カテゴリー</label>
                <select name="category" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="mv">MV</option>
                  <option value="lyric">Lyric</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">YouTube埋め込みコード</label>
              <input type="text" name="embedCode" placeholder="YouTubeのIDまたはURL" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">説明</label>
              <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            
            <button type="submit" class="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              追加する
            </button>
          </form>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium mb-4">作品一覧</h3>
          <div id="works-list" class="space-y-4">
            {/* Works list will be loaded here */}
          </div>
        </div>
      </div>
    </div>,
    { title: '管理画面 - DVけむし' }
  )
})

// API Routes
// Login API (simplified without JWT for now)
app.post('/api/admin/login', async (c) => {
  const { password } = await c.req.json()
  const env = c.env
  
  if (password === (env.ADMIN_PASSWORD || 'admin123')) {
    // Simple token generation without JWT library
    const token = btoa(JSON.stringify({
      admin: true,
      timestamp: Date.now()
    }))
    return c.json({ success: true, token })
  }
  
  return c.json({ success: false, message: 'Invalid password' }, 401)
})

// Works CRUD API
app.get('/api/works', async (c) => {
  try {
    const { env } = c
    const { results } = await env.DB.prepare(
      'SELECT * FROM works ORDER BY created_at DESC'
    ).all()
    return c.json({ success: true, works: results || [] })
  } catch (error) {
    // Return empty array if table doesn't exist yet
    return c.json({ success: true, works: [] })
  }
})

app.post('/api/works', async (c) => {
  const { title, category, embedCode, description } = await c.req.json()
  const { env } = c
  
  try {
    // Create table if not exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS works (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        embed_code TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Insert new work
    const result = await env.DB.prepare(`
      INSERT INTO works (title, category, embed_code, description)
      VALUES (?, ?, ?, ?)
    `).bind(title, category, embedCode, description).run()
    
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

app.delete('/api/works/:id', async (c) => {
  const id = c.req.param('id')
  const { env } = c
  
  try {
    await env.DB.prepare('DELETE FROM works WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

// Contact form API
app.post('/api/contact', async (c) => {
  const { name, email, type, message } = await c.req.json()
  const { env } = c
  
  try {
    // Create table if not exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        type TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Insert contact
    await env.DB.prepare(`
      INSERT INTO contacts (name, email, type, message)
      VALUES (?, ?, ?, ?)
    `).bind(name, email, type, message).run()
    
    return c.json({ success: true, message: 'お問い合わせを受け付けました。' })
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

export default app