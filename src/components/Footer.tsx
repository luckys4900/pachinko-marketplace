import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD700] flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="text-xl font-bold text-white">Pachinko Market</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              パチンコ中古台の売買・オークションを安全・便利に。全国の中古台を簡単に検索・取引できます。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-[#FF6B35] transition-colors">台を探す</Link></li>
              <li><Link href="/auctions" className="hover:text-[#FF6B35] transition-colors">オークション</Link></li>
              <li><Link href="/sell" className="hover:text-[#FF6B35] transition-colors">出品する</Link></li>
              <li><Link href="/mypage" className="hover:text-[#FF6B35] transition-colors">マイページ</Link></li>
            </ul>
          </div>

          {/* Guide */}
          <div>
            <h3 className="text-white font-semibold mb-4">ガイド</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">初めての方へ</Link></li>
              <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">取引の流れ</Link></li>
              <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">安心への取り組み</Link></li>
              <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">よくある質問</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">お問い合わせ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@pachinko-market.jp
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                0120-XXX-XXX
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <span className="px-3 py-1 bg-[#FF6B35]/20 text-[#FF6B35] rounded-full text-xs font-medium">SSL対応</span>
              <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-xs font-medium">本人確認</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; 2026 Pachinko Market. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">利用規約</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">特定商取引法</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
