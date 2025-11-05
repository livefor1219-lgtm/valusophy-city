'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, Video, FileText, X, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';

interface UploadPostProps {
  onSuccess?: () => void;
}

export default function UploadPost({ onSuccess }: UploadPostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'image' | 'video' | 'text'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');

    // 미리보기 생성
    if (type === 'image' && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (type === 'video' && selectedFile.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      if (content) {
        formData.append('content', content);
      }
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch('/api/posts/create', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create post');
      }

      // 성공
      setTitle('');
      setContent('');
      setFile(null);
      setPreview(null);
      setIsOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload post');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle('');
    setContent('');
    setFile(null);
    setPreview(null);
    setError('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors">
          <Upload className="w-6 h-6" />
          <span className="text-lg font-semibold">새 창작물 업로드</span>
        </div>
      </button>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">새 창작물 업로드</h3>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 타입 선택 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setType('image');
              setFile(null);
              setPreview(null);
            }}
            className={`flex-1 p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
              type === 'image'
                ? 'bg-[#2B0727]/30 border-[#BA8E4C]/20 text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm">이미지</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setType('video');
              setFile(null);
              setPreview(null);
            }}
            className={`flex-1 p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
              type === 'video'
                ? 'bg-[#2B0727]/30 border-[#BA8E4C]/20 text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Video className="w-5 h-5" />
            <span className="text-sm">비디오</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setType('text');
              setFile(null);
              setPreview(null);
            }}
            className={`flex-1 p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
              type === 'text'
                ? 'bg-[#2B0727]/30 border-[#BA8E4C]/20 text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm">텍스트</span>
          </button>
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">제목 *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors"
            placeholder="창작물 제목을 입력하세요"
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#BA8E4C] transition-colors resize-none"
            placeholder="설명을 입력하세요"
          />
        </div>

        {/* 파일 업로드 */}
        {(type === 'image' || type === 'video') && (
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              {type === 'image' ? '이미지' : '비디오'} 파일
            </label>
            <input
              type="file"
              accept={type === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#BA8E4C] file:text-white hover:file:bg-[#BA8E4C]/80 transition-colors"
            />
            {preview && (
              <div className="mt-4 relative">
                {type === 'image' ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-lg max-h-64 object-cover"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="w-full rounded-lg max-h-64"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading || !title}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2B0727] to-[#BA8E4C] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                업로드 중...
              </>
            ) : (
              '업로드'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

