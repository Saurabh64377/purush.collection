import { useEffect, useState } from 'react';
import {
  PiSpinnerBold,
  PiFloppyDiskBold,
  PiCheckBold,
  PiImageBold,
  PiXBold,
  PiPlusBold,
  PiTrashBold,
} from 'react-icons/pi';
import api from '../lib/api';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:5000';

const TABS = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'about', label: 'About Section' },
  { key: 'founder', label: 'Founder Section' },
  { key: 'brand', label: 'Brand Info' },
  { key: 'store', label: 'Store Info' },
  { key: 'socials', label: 'Social Links' },
  { key: 'navLinks', label: 'Navigation' },
  { key: 'whyChooseUs', label: 'Why Choose Us' },
  { key: 'experienceSteps', label: 'Experience' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'contactForm', label: 'Contact Form' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('hero');
  const [settings, setSettings] = useState({});
  const [editing, setEditing] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [imagePreviews, setImagePreviews] = useState({});

  const uploadImage = async (file, sectionKey) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'settings');
      const res = await api.post('/media/upload', formData);
      const url = res.data.url;
      setImagePreviews((prev) => ({ ...prev, [sectionKey]: url }));
      return url;
    } catch (err) {
      setError('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImagePick = async (e, sectionKey) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file, sectionKey);
    if (url) {
      const data = editing[sectionKey] || {};
      updateEditing(sectionKey, { ...data, image: url });
    }
  };

  useEffect(() => {
    api.get('/settings')
      .then((res) => {
        setSettings(res.data);
        setEditing(res.data);
      })
      .catch((err) => setError('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const updateEditing = (key, value) => {
    setEditing((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      await api.put('/settings/bulk', { settings: editing });
      setSettings(editing);
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const renderTabContent = () => {
    const data = editing[activeTab];

    switch (activeTab) {
      case 'hero':
        return data ? (
          <div className="flex flex-col gap-5">
            <Input label="Eyebrow" value={data.eyebrow} onChange={(v) => updateEditing('hero', { ...data, eyebrow: v })} />
            <Input label="Heading" value={data.heading} onChange={(v) => updateEditing('hero', { ...data, heading: v })} />
            <Textarea label="Description" value={data.description} onChange={(v) => updateEditing('hero', { ...data, description: v })} />
            <Input label="Primary Button Text" value={data.primaryButtonText} onChange={(v) => updateEditing('hero', { ...data, primaryButtonText: v })} />
            <Input label="Primary Button Link" value={data.primaryButtonLink} onChange={(v) => updateEditing('hero', { ...data, primaryButtonLink: v })} />
            <Input label="Secondary Button Text" value={data.secondaryButtonText} onChange={(v) => updateEditing('hero', { ...data, secondaryButtonText: v })} />
            <Input label="Secondary Button Link" value={data.secondaryButtonLink} onChange={(v) => updateEditing('hero', { ...data, secondaryButtonLink: v })} />
            <ImageUpload label="Hero Image" value={data.image} preview={imagePreviews.hero} sectionKey="hero" onPick={handleImagePick} onChange={(v) => updateEditing('hero', { ...data, image: v })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stats</label>
              {(data.stats || []).map((stat, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="number" value={stat.value} onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[i] = { ...stat, value: parseInt(e.target.value) || 0 };
                    updateEditing('hero', { ...data, stats: newStats });
                  }} className="w-20 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                  <input type="text" value={stat.suffix} onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[i] = { ...stat, suffix: e.target.value };
                    updateEditing('hero', { ...data, stats: newStats });
                  }} className="w-20 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="+" />
                  <input type="text" value={stat.label} onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[i] = { ...stat, label: e.target.value };
                    updateEditing('hero', { ...data, stats: newStats });
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Label" />
                  <button onClick={() => {
                    updateEditing('hero', { ...data, stats: data.stats.filter((_, j) => j !== i) });
                  }} className="p-2 text-red-400 hover:text-red-600"><PiTrashBold /></button>
                </div>
              ))}
              <button onClick={() => updateEditing('hero', { ...data, stats: [...(data.stats || []), { value: 0, suffix: '+', label: '' }] })}
                className="text-sm text-pink hover:text-pink-deep flex items-center gap-1"><PiPlusBold /> Add Stat</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chips</label>
              {(data.chips || []).map((chip, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" value={chip.label} onChange={(e) => {
                    const newChips = [...data.chips];
                    newChips[i] = { label: e.target.value };
                    updateEditing('hero', { ...data, chips: newChips });
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                  <button onClick={() => updateEditing('hero', { ...data, chips: data.chips.filter((_, j) => j !== i) })}
                    className="p-2 text-red-400 hover:text-red-600"><PiTrashBold /></button>
                </div>
              ))}
              <button onClick={() => updateEditing('hero', { ...data, chips: [...(data.chips || []), { label: '' }] })}
                className="text-sm text-pink hover:text-pink-deep flex items-center gap-1"><PiPlusBold /> Add Chip</button>
            </div>
          </div>
        ) : null;

      case 'about':
        return data ? (
          <div className="flex flex-col gap-5">
            <Input label="Heading" value={data.heading} onChange={(v) => updateEditing('about', { ...data, heading: v })} />
            <Textarea label="Description" value={data.description} onChange={(v) => updateEditing('about', { ...data, description: v })} />
            <Textarea label="Paragraph" value={data.paragraph} onChange={(v) => updateEditing('about', { ...data, paragraph: v })} />
            <ImageUpload label="About Image" value={data.image} preview={imagePreviews.about} sectionKey="about" onPick={handleImagePick} onChange={(v) => updateEditing('about', { ...data, image: v })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pillars</label>
              {(data.pillars || []).map((p, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" value={p.number} onChange={(e) => {
                    const newP = [...data.pillars]; newP[i] = { ...p, number: e.target.value };
                    updateEditing('about', { ...data, pillars: newP });
                  }} className="w-16 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                  <input type="text" value={p.title} onChange={(e) => {
                    const newP = [...data.pillars]; newP[i] = { ...p, title: e.target.value };
                    updateEditing('about', { ...data, pillars: newP });
                  }} className="w-32 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                  <input type="text" value={p.body} onChange={(e) => {
                    const newP = [...data.pillars]; newP[i] = { ...p, body: e.target.value };
                    updateEditing('about', { ...data, pillars: newP });
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                  <button onClick={() => updateEditing('about', { ...data, pillars: data.pillars.filter((_, j) => j !== i) })}
                    className="p-2 text-red-400"><PiTrashBold /></button>
                </div>
              ))}
              <button onClick={() => updateEditing('about', { ...data, pillars: [...(data.pillars || []), { number: '', title: '', body: '' }] })}
                className="text-sm text-pink hover:text-pink-deep flex items-center gap-1"><PiPlusBold /> Add Pillar</button>
            </div>
          </div>
        ) : null;

      case 'founder':
        return data ? (
          <div className="flex flex-col gap-5">
            <Textarea label="Quote" value={data.quote} onChange={(v) => updateEditing('founder', { ...data, quote: v })} />
            <Textarea label="Description" value={data.description} onChange={(v) => updateEditing('founder', { ...data, description: v })} />
            <ImageUpload label="Founder Image" value={data.image} preview={imagePreviews.founder} sectionKey="founder" onPick={handleImagePick} onChange={(v) => updateEditing('founder', { ...data, image: v })} />
          </div>
        ) : null;

      case 'brand':
        return data ? (
          <div className="flex flex-col gap-5">
            <Input label="Full Name" value={data.name} onChange={(v) => updateEditing('brand', { ...data, name: v })} />
            <Input label="Short Name" value={data.short} onChange={(v) => updateEditing('brand', { ...data, short: v })} />
            <Input label="Tagline" value={data.tagline} onChange={(v) => updateEditing('brand', { ...data, tagline: v })} />
            <Input label="Founder Name" value={data.founder} onChange={(v) => updateEditing('brand', { ...data, founder: v })} />
            <Textarea label="Description" value={data.description} onChange={(v) => updateEditing('brand', { ...data, description: v })} />
          </div>
        ) : null;

      case 'store':
        return data ? (
          <div className="flex flex-col gap-5">
            <Textarea label="Address Lines (one per line)" value={(data.addressLines || []).join('\n')} onChange={(v) => updateEditing('store', { ...data, addressLines: v.split('\n') })} />
            <Input label="One-line Address" value={data.addressOneLine} onChange={(v) => updateEditing('store', { ...data, addressOneLine: v })} />
            <Input label="Phone Display" value={data.phoneDisplay} onChange={(v) => updateEditing('store', { ...data, phoneDisplay: v })} />
            <Input label="Phone Link (tel:...)" value={data.phoneHref} onChange={(v) => updateEditing('store', { ...data, phoneHref: v })} />
            <Input label="Email" value={data.email} onChange={(v) => updateEditing('store', { ...data, email: v })} />
            <Input label="Map Embed URL" value={data.mapEmbedSrc} onChange={(v) => updateEditing('store', { ...data, mapEmbedSrc: v })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
              {(data.hours || []).map((h, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" value={h.day} onChange={(e) => {
                    const newH = [...data.hours]; newH[i] = { ...h, day: e.target.value };
                    updateEditing('store', { ...data, hours: newH });
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Day" />
                  <input type="text" value={h.time} onChange={(e) => {
                    const newH = [...data.hours]; newH[i] = { ...h, time: e.target.value };
                    updateEditing('store', { ...data, hours: newH });
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Time" />
                  <button onClick={() => updateEditing('store', { ...data, hours: data.hours.filter((_, j) => j !== i) })}
                    className="p-2 text-red-400"><PiTrashBold /></button>
                </div>
              ))}
              <button onClick={() => updateEditing('store', { ...data, hours: [...(data.hours || []), { day: '', time: '' }] })}
                className="text-sm text-pink hover:text-pink-deep flex items-center gap-1"><PiPlusBold /> Add Hours</button>
            </div>
          </div>
        ) : null;

      case 'socials':
        return Array.isArray(data) ? (
          <div className="flex flex-col gap-5">
            {data.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={s.label} onChange={(e) => {
                  const newS = [...data]; newS[i] = { ...s, label: e.target.value };
                  updateEditing('socials', newS);
                }} className="w-32 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Label" />
                <input type="text" value={s.href} onChange={(e) => {
                  const newS = [...data]; newS[i] = { ...s, href: e.target.value };
                  updateEditing('socials', newS);
                }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="URL" />
                <input type="text" value={s.icon} onChange={(e) => {
                  const newS = [...data]; newS[i] = { ...s, icon: e.target.value };
                  updateEditing('socials', newS);
                }} className="w-48 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Icon name" />
                <button onClick={() => updateEditing('socials', data.filter((_, j) => j !== i))}
                  className="p-2 text-red-400"><PiTrashBold /></button>
              </div>
            ))}
            <button onClick={() => updateEditing('socials', [...data, { label: '', href: '', icon: '' }])}
              className="text-sm text-pink flex items-center gap-1"><PiPlusBold /> Add Social Link</button>
          </div>
        ) : null;

      case 'navLinks':
        return Array.isArray(data) ? (
          <div className="flex flex-col gap-5">
            {data.map((link, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={link.label} onChange={(e) => {
                  const newL = [...data]; newL[i] = { ...link, label: e.target.value };
                  updateEditing('navLinks', newL);
                }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Label" />
                <input type="text" value={link.href} onChange={(e) => {
                  const newL = [...data]; newL[i] = { ...link, href: e.target.value };
                  updateEditing('navLinks', newL);
                }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="#section" />
                <button onClick={() => updateEditing('navLinks', data.filter((_, j) => j !== i))}
                  className="p-2 text-red-400"><PiTrashBold /></button>
              </div>
            ))}
            <button onClick={() => updateEditing('navLinks', [...data, { label: '', href: '#' }])}
              className="text-sm text-pink flex items-center gap-1"><PiPlusBold /> Add Link</button>
          </div>
        ) : null;

      case 'whyChooseUs':
      case 'experienceSteps':
        return Array.isArray(data) ? (
          <div className="flex flex-col gap-5">
            {data.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={item.title || item.number || ''} onChange={(e) => {
                  const newD = [...data];
                  if (item.title !== undefined) newD[i] = { ...item, title: e.target.value };
                  else newD[i] = { ...item, number: e.target.value };
                  updateEditing(activeTab, newD);
                }} className="w-32 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                <input type="text" value={item.description || ''} onChange={(e) => {
                  const newD = [...data]; newD[i] = { ...item, description: e.target.value };
                  updateEditing(activeTab, newD);
                }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                <button onClick={() => updateEditing(activeTab, data.filter((_, j) => j !== i))}
                  className="p-2 text-red-400"><PiTrashBold /></button>
              </div>
            ))}
            <button onClick={() => updateEditing(activeTab, [...data, { title: activeTab === 'experienceSteps' ? '' : '', number: '', description: '' }])}
              className="text-sm text-pink flex items-center gap-1"><PiPlusBold /> Add Item</button>
          </div>
        ) : null;

      case 'testimonials':
        return Array.isArray(data) ? (
          <div className="flex flex-col gap-5">
            {data.map((t, i) => (
              <div key={i} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl">
                <div className="flex gap-2">
                  <input type="text" value={t.name} onChange={(e) => {
                    const newT = [...data]; newT[i] = { ...t, name: e.target.value };
                    updateEditing('testimonials', newT);
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Name" />
                  <input type="text" value={t.role} onChange={(e) => {
                    const newT = [...data]; newT[i] = { ...t, role: e.target.value };
                    updateEditing('testimonials', newT);
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Role" />
                  <button onClick={() => updateEditing('testimonials', data.filter((_, j) => j !== i))}
                    className="p-2 text-red-400"><PiTrashBold /></button>
                </div>
                <textarea value={t.quote} onChange={(e) => {
                  const newT = [...data]; newT[i] = { ...t, quote: e.target.value };
                  updateEditing('testimonials', newT);
                }} rows={2} className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Quote" />
              </div>
            ))}
            <button onClick={() => updateEditing('testimonials', [...data, { name: '', role: '', quote: '' }])}
              className="text-sm text-pink flex items-center gap-1"><PiPlusBold /> Add Testimonial</button>
          </div>
        ) : null;

      case 'faqs':
        return Array.isArray(data) ? (
          <div className="flex flex-col gap-5">
            {data.map((faq, i) => (
              <div key={i} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl">
                <div className="flex gap-2">
                  <input type="text" value={faq.question} onChange={(e) => {
                    const newF = [...data]; newF[i] = { ...faq, question: e.target.value };
                    updateEditing('faqs', newF);
                  }} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Question" />
                  <button onClick={() => updateEditing('faqs', data.filter((_, j) => j !== i))}
                    className="p-2 text-red-400"><PiTrashBold /></button>
                </div>
                <textarea value={faq.answer} onChange={(e) => {
                  const newF = [...data]; newF[i] = { ...faq, answer: e.target.value };
                  updateEditing('faqs', newF);
                }} rows={2} className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Answer" />
              </div>
            ))}
            <button onClick={() => updateEditing('faqs', [...data, { question: '', answer: '' }])}
              className="text-sm text-pink flex items-center gap-1"><PiPlusBold /> Add FAQ</button>
          </div>
        ) : null;

      case 'contactForm':
        return data ? (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Options (comma separated)</label>
              <input type="text" value={(data.ageOptions || []).join(', ')} onChange={(e) => updateEditing('contactForm', { ...data, ageOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Options (comma separated)</label>
              <textarea value={(data.interestOptions || []).join(', ')} onChange={(e) => updateEditing('contactForm', { ...data, interestOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                rows={3} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Options (comma separated)</label>
              <input type="text" value={(data.budgetOptions || []).join(', ')} onChange={(e) => updateEditing('contactForm', { ...data, budgetOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        ) : null;

      default:
        return <p className="text-gray-400">Select a section to edit</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <PiSpinnerBold className="text-3xl text-pink animate-spin-slow" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Site Settings</h2>
          <p className="text-gray-500 mt-1">Manage all website content</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-pink hover:bg-pink-deep text-white px-5 py-3 text-sm font-medium transition-colors disabled:opacity-60">
          {saving ? <><PiSpinnerBold className="animate-spin-slow" /> Saving...</> : <><PiFloppyDiskBold /> Save All Changes</>}
        </button>
      </div>

      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm flex items-center gap-2">
          <PiCheckBold className="text-lg" /> {success}
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}

      <div className="flex gap-6">
        <div className="w-56 flex-shrink-0 flex flex-col gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-pink/10 text-pink'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[500px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30" />
    </div>
  );
}

function ImageUpload({ label, value, preview, sectionKey, onPick, onChange }) {
  const displayUrl = preview || (value && value.startsWith('http') ? value : value ? `${API_BASE}${value}` : '');
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-4">
        {displayUrl ? (
          <img src={displayUrl} alt="Preview" className="h-24 w-24 rounded-xl object-cover border" />
        ) : (
          <div className="h-24 w-24 rounded-xl bg-gray-100 flex items-center justify-center border">
            <PiImageBold className="text-2xl text-gray-400" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer rounded-xl border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-pink hover:text-pink transition-colors">
            <input type="file" accept="image/*" onChange={(e) => onPick(e, sectionKey)} className="hidden" />
            <PiPlusBold className="inline mr-1" />
            Upload Image
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL..."
            className="rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30"
          />
        </div>
      </div>
    </div>
  );
}
