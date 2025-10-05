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
            <div class="flex items-center space-x-2">
              <img src="/icon-dvkemushi.png" alt="DVけむし" class="w-8 h-8 rounded-full" />
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
            <div class="flex items-center justify-center space-x-4 animate-fade-in">
              <img src="/icon-dvkemushi.png" alt="DVけむし" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg" />
              <h1 class="text-5xl sm:text-6xl font-thin text-gray-800 tracking-wider">
                DVけむし
              </h1>
            </div>
            <p class="text-xl sm:text-2xl text-gray-600 font-light">
              映像師 / Motion Graphics Designer
            </p>
            <div class="space-y-2">
              <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                ボカロ曲や歌ってみた動画のイラストMV、リリックモーション制作
              </p>
              <div id="available-date" class="text-sm text-blue-600 font-medium">
                {/* Available date will be loaded dynamically */}
              </div>
            </div>
            <div class="pt-8">
              <a href="/portfolio" class="btn-water inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
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
            <div class="glass-enhanced p-8 rounded-lg shadow-lg relative overflow-hidden">
              <div class="text-4xl mb-4 text-gray-700">
                <i class="fas fa-video"></i>
              </div>
              <h3 class="text-xl font-light mb-3">イラストMV制作</h3>
              <p class="text-gray-600">ボカロ曲や歌ってみた動画に映像を付けて、作品の世界観を視覚的に表現します</p>
            </div>
            <div class="glass-enhanced p-8 rounded-lg shadow-lg relative overflow-hidden">
              <div class="text-4xl mb-4 text-gray-700">
                <i class="fas fa-music"></i>
              </div>
              <h3 class="text-xl font-light mb-3">リリックモーション</h3>
              <p class="text-gray-600">歌詞をアニメーションで魅せる、印象的なリリックビデオを制作します</p>
            </div>
            <div class="glass-enhanced p-8 rounded-lg shadow-lg relative overflow-hidden">
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

      {/* Call to Action Section */}
      <section class="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-light text-gray-800 mb-6">ご依頼・お問い合わせ</h2>
          <p class="text-lg text-gray-600 mb-8">映像制作のご相談はXのDMでお気軽に</p>
          <a href="https://x.com/dvKemushi" 
             target="_blank" 
             class="btn-water inline-flex items-center px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <i class="fab fa-x-twitter mr-2"></i>
            @dvKemushi に相談する
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer class="relative z-10 bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <p class="mb-4">© 2024 DVけむし. All rights reserved.</p>
          <div class="space-x-4">
            <a href="https://x.com/dvKemushi" target="_blank" class="hover:text-gray-300 transition">
              <i class="fab fa-x-twitter"></i> X (Twitter)
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
            <div class="flex items-center space-x-2">
              <a href="/" class="flex items-center space-x-2 text-xl font-light tracking-wide text-gray-800">
                <img src="/icon-dvkemushi.png" alt="DVけむし" class="w-8 h-8 rounded-full" />
                <span>DVけむし</span>
              </a>
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
            <div class="flex items-center space-x-2">
              <a href="/" class="flex items-center space-x-2 text-xl font-light tracking-wide text-gray-800">
                <img src="/icon-dvkemushi.png" alt="DVけむし" class="w-8 h-8 rounded-full" />
                <span>DVけむし</span>
              </a>
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
            <div class="flex items-center space-x-2">
              <a href="/" class="flex items-center space-x-2 text-xl font-light tracking-wide text-gray-800">
                <img src="/icon-dvkemushi.png" alt="DVけむし" class="w-8 h-8 rounded-full" />
                <span>DVけむし</span>
              </a>
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
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-light text-gray-800 text-center mb-12">Contact</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* X (Twitter) Contact */}
            <div class="glass-enhanced rounded-lg shadow-lg p-8 text-center">
              <div class="mb-6">
                <i class="fab fa-x-twitter text-6xl text-gray-800"></i>
              </div>
              <h2 class="text-2xl font-light mb-4">X (Twitter) でお問い合わせ</h2>
              <p class="text-gray-600 mb-6">
                ご依頼・お問い合わせはXのDMにて承っております
              </p>
              <div class="space-y-4">
                <a href="https://x.com/dvKemushi" 
                   target="_blank" 
                   class="btn-water inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
                  <i class="fab fa-x-twitter mr-2"></i>
                  @dvKemushi をフォロー
                </a>
                <a href="https://x.com/messages/compose?recipient_id=dvKemushi" 
                   target="_blank" 
                   class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
                  <i class="fas fa-envelope mr-2"></i>
                  DMを送る
                </a>
              </div>
              <div class="mt-6 text-sm text-gray-500">
                <p>@dvKemushi</p>
              </div>
            </div>

            {/* Latest Posts */}
            <div class="glass-enhanced rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-light mb-6">Latest Posts</h2>
              <div class="twitter-timeline-container" style="max-height: 500px; overflow-y: auto;">
                <a class="twitter-timeline" 
                   data-height="450"
                   data-theme="light"
                   data-chrome="noheader nofooter noborders"
                   href="https://x.com/dvKemushi?ref_src=twsrc%5Etfw">
                  Latest posts from @dvKemushi
                </a>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <div class="glass-enhanced rounded-lg shadow-lg p-8">
              <h3 class="text-xl font-light mb-4">制作のご依頼について</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <div class="flex items-start">
                    <i class="fas fa-yen-sign mt-1 mr-3 text-blue-500"></i>
                    <div>
                      <p class="font-medium">料金</p>
                      <p class="text-gray-600">10,000円〜</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex items-start">
                    <i class="fas fa-calendar-alt mt-1 mr-3 text-blue-500"></i>
                    <div>
                      <p class="font-medium">納期</p>
                      <p class="text-gray-600">4週間</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex items-start">
                    <i class="fas fa-globe mt-1 mr-3 text-blue-500"></i>
                    <div>
                      <p class="font-medium">対応エリア</p>
                      <p class="text-gray-600">日本全国</p>
                    </div>
                  </div>
                </div>
              </div>
              <p class="mt-6 text-gray-600">
                個人・企業問わず承っております。<br/>
                まずはお気軽にDMでご相談ください。
              </p>
            </div>
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
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium mb-4">着手可能日設定</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">着手可能日</label>
                  <input type="date" id="available-date-input" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button onclick="updateAvailableDate()" class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  更新
                </button>
                <div id="current-available-date" class="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  {/* Current available date will be shown here */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Works Management Section */}
          <div class="lg:col-span-2">
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
                    <label class="block text-sm font-medium text-gray-700 mb-2">制作日</label>
                    <input type="date" name="productionDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
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
      'SELECT * FROM works ORDER BY production_date DESC, created_at DESC'
    ).all()
    return c.json({ success: true, works: results || [] })
  } catch (error) {
    // Return empty array if table doesn't exist yet
    return c.json({ success: true, works: [] })
  }
})

app.post('/api/works', async (c) => {
  const { title, category, embedCode, description, productionDate } = await c.req.json()
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
        production_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Insert new work
    const result = await env.DB.prepare(`
      INSERT INTO works (title, category, embed_code, description, production_date)
      VALUES (?, ?, ?, ?, ?)
    `).bind(title, category, embedCode, description, productionDate || null).run()
    
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

// Settings API
app.get('/api/settings/:key', async (c) => {
  const key = c.req.param('key')
  const { env } = c
  
  try {
    // Create settings table if not exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    const result = await env.DB.prepare(
      'SELECT value FROM settings WHERE key = ?'
    ).bind(key).first()
    
    if (result) {
      return c.json({ success: true, value: result.value })
    } else {
      // Return default value for available_date
      if (key === 'available_date') {
        const defaultDate = new Date()
        defaultDate.setDate(defaultDate.getDate() + 14)
        return c.json({ success: true, value: defaultDate.toISOString().split('T')[0] })
      }
      return c.json({ success: false, message: 'Setting not found' }, 404)
    }
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

app.post('/api/settings/:key', async (c) => {
  const key = c.req.param('key')
  const { value } = await c.req.json()
  const { env } = c
  
  try {
    // Create settings table if not exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()
    
    // Upsert setting
    await env.DB.prepare(`
      INSERT OR REPLACE INTO settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `).bind(key, value).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

// Legacy contact form API (kept for backward compatibility)
app.post('/api/contact', async (c) => {
  // Redirects to X (Twitter) DM
  return c.json({ 
    success: false, 
    message: 'お問い合わせはX (Twitter) のDMで承っております。',
    redirect: 'https://x.com/dvKemushi'
  }, 410)
})

export default app