"use client";

import { useState } from "react";
import { machines, MAKERS } from "@/data/mock";
import { cn } from "@/lib/utils";

const STEPS = ["機種選択", "詳細入力", "確認・出品"];

const inputClass = "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition";
const labelClass = "block text-sm font-semibold text-[var(--text)] mb-2";

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    machineName: "", maker: "all", modelNumber: "", category: "CR",
    condition: "A", conditionDetail: "", price: "", description: "",
    location: "", images: [] as string[], contact: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = () => {
    const placeholder = `https://placehold.co/600x400/FF6B35/FFFFFF?text=画像${form.images.length + 1}`;
    setForm((prev) => ({ ...prev, images: [...prev.images, placeholder] }));
  };

  const removeImage = (idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const canProceed = () => {
    if (step === 0) return form.machineName.length > 0;
    if (step === 1) return form.price.length > 0 && form.location.length > 0;
    return true;
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-4xl mb-6">✓</div>
        <h1 className="text-3xl font-black text-[var(--text)]">出品が完了しました！</h1>
        <p className="text-[var(--text-muted)] mt-3">出品内容を確認後、サイトに反映されます。</p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="/" className="px-6 py-3 rounded-xl border border-[var(--border)] font-semibold hover:bg-[var(--bg)] transition">ホームに戻る</a>
          <a href="/mypage" className="px-6 py-3 rounded-xl bg-[#FF6B35] text-white font-semibold hover:bg-[#E55A2B] transition">マイページへ</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[var(--text)]">出品する</h1>
        <p className="text-[var(--text-muted)] mt-1">中古台の情報を入力して出品しましょう</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={cn("flex items-center gap-2 w-full",
              i <= step ? "text-[#FF6B35]" : "text-[var(--text-muted)]"
            )}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                i < step ? "bg-[#FF6B35] text-white" :
                i === step ? "bg-[#FF6B35]/10 text-[#FF6B35] border-2 border-[#FF6B35]" :
                "bg-[var(--bg)] border border-[var(--border)]"
              )}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn("h-0.5 flex-1 mx-2", i < step ? "bg-[#FF6B35]" : "bg-[var(--border)]")} />}
          </div>
        ))}
      </div>

      {/* Step 0: Machine Selection */}
      {step === 0 && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <label className={labelClass}>機種名 <span className="text-[#EF4444]">*</span></label>
            <input type="text" value={form.machineName} onChange={(e) => updateForm("machineName", e.target.value)}
              placeholder="例: CR 天才バカボン" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>メーカー</label>
              <select value={form.maker} onChange={(e) => updateForm("maker", e.target.value)} className={inputClass}>
                <option value="all">選択してください</option>
                {MAKERS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>型番</label>
              <input type="text" value={form.modelNumber} onChange={(e) => updateForm("modelNumber", e.target.value)}
                placeholder="例: SXB" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>カテゴリ</label>
            <div className="flex flex-wrap gap-2">
              {["CR", "Deji", "LightMiddle", "Gaidai"].map((c) => (
                <button key={c} onClick={() => updateForm("category", c)}
                  className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    form.category === c ? "bg-[#FF6B35] text-white" : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
                  )}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>状態 <span className="text-[#EF4444]">*</span></label>
              <select value={form.condition} onChange={(e) => updateForm("condition", e.target.value)} className={inputClass}>
                <option value="S">S: 新品同様</option>
                <option value="A">A: 美品</option>
                <option value="B">B: 良品</option>
                <option value="C">C: 使用感あり</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>希望価格 <span className="text-[#EF4444]">*</span></label>
              <input type="number" value={form.price} onChange={(e) => updateForm("price", e.target.value)}
                placeholder="300000" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>状態の詳細</label>
            <input type="text" value={form.conditionDetail} onChange={(e) => updateForm("conditionDetail", e.target.value)}
              placeholder="外装良好、動作確認済みなど" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>引き渡し場所 <span className="text-[#EF4444]">*</span></label>
            <input type="text" value={form.location} onChange={(e) => updateForm("location", e.target.value)}
              placeholder="例: 東京都新宿区" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>説明文</label>
            <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)}
              rows={4} placeholder="台の状態や特記事項を記載してください" className={cn(inputClass, "resize-none")} />
          </div>
          <div>
            <label className={labelClass}>画像アップロード</label>
            <div className="grid grid-cols-4 gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border)]">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600">✕</button>
                </div>
              ))}
              {form.images.length < 8 && (
                <button onClick={handleImageUpload}
                  className="aspect-square rounded-xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center text-[var(--text-muted)] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs mt-1">追加</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Confirm */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 bg-[var(--bg)] border-b border-[var(--border)]">
              <h3 className="font-bold">出品内容の確認</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {[
                ["機種名", form.machineName],
                ["メーカー", form.maker === "all" ? "未選択" : form.maker],
                ["型番", form.modelNumber || "未入力"],
                ["カテゴリ", form.category],
                ["状態", `${form.condition}ランク`],
                ["状態詳細", form.conditionDetail || "未入力"],
                ["希望価格", form.price ? `${parseInt(form.price).toLocaleString()}円` : "未入力"],
                ["引き渡し場所", form.location || "未入力"],
                ["説明文", form.description || "未入力"],
                ["画像", `${form.images.length}枚`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center px-6 py-3">
                  <span className="w-32 text-sm font-semibold text-[var(--text-muted)] shrink-0">{label}</span>
                  <span className="text-[var(--text)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          {form.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {form.images.map((img, i) => (
                <img key={i} src={img} alt="" className="w-24 h-24 rounded-xl object-cover shrink-0" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--border)]">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-[var(--border)] font-semibold hover:bg-[var(--bg)] transition">
            戻る
          </button>
        ) : <div />}
        {step < 2 ? (
          <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
            className={cn("px-8 py-3 rounded-xl font-bold transition-all",
              canProceed() ? "bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}>
            次へ
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            この内容で出品する
          </button>
        )}
      </div>
    </div>
  );
}
