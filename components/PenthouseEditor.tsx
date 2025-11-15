'use client';

import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  Plus, GripVertical, Type, Image as ImageIcon, 
  Video, Link2, Grid3x3, Minus, Save, Trash2 
} from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { User } from '@supabase/supabase-js';

interface Block {
  id: string;
  type: 'header' | 'text' | 'image' | 'video' | 'gallery' | 'link' | 'divider';
  content: any;
  position: number;
  width?: 'full' | 'half' | 'third';
}

interface PenthouseEditorProps {
  user: User | null;
}

export default function PenthouseEditor({ user }: PenthouseEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadBlocks();
    }
  }, [user]);

  const loadBlocks = async () => {
    if (!user) return;

    try {
      const supabase = createBrowserClient();
      
      // 먼저 resident 레코드 찾기
      const { data: resident } = await supabase
        .from('residents')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (!resident) {
        setLoading(false);
        return;
      }

      // 블록 로드
      const { data, error } = await supabase
        .from('penthouse_blocks')
        .select('*')
        .eq('resident_id', resident.id)
        .order('position', { ascending: true });

      if (error) {
        console.error('블록 로드 실패:', error);
      } else {
        setBlocks(data || []);
      }
    } catch (error) {
      console.error('로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBlocks = async () => {
    if (!user || blocks.length === 0) return;

    setSaving(true);
    try {
      const supabase = createBrowserClient();
      
      const { data: resident } = await supabase
        .from('residents')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (!resident) {
        alert('입주민 정보를 찾을 수 없습니다.');
        return;
      }

      // 기존 블록 삭제 후 새로 저장
      await supabase
        .from('penthouse_blocks')
        .delete()
        .eq('resident_id', resident.id);

      // 새 블록 저장
      const blocksToInsert = blocks.map((block, index) => ({
        resident_id: resident.id,
        type: block.type,
        content: block.content,
        position: index,
        width: block.width || 'full',
      }));

      const { error } = await supabase
        .from('penthouse_blocks')
        .insert(blocksToInsert);

      if (error) {
        console.error('저장 실패:', error);
        alert('저장에 실패했습니다.');
      } else {
        alert('저장되었습니다!');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      position: blocks.length,
      width: 'full',
    };
    setBlocks([...blocks, newBlock]);
    setEditingBlock(newBlock.id);
  };

  const getDefaultContent = (type: Block['type']) => {
    switch (type) {
      case 'header':
        return { text: '새로운 헤더', level: 1 };
      case 'text':
        return { text: '새로운 텍스트 블록' };
      case 'image':
        return { url: '', alt: '' };
      case 'video':
        return { url: '', title: '' };
      case 'gallery':
        return { images: [] };
      case 'link':
        return { url: '', title: '', description: '' };
      case 'divider':
        return {};
      default:
        return {};
    }
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id).map((block, index) => ({
      ...block,
      position: index,
    })));
    if (editingBlock === id) {
      setEditingBlock(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#BA8E4C] mx-auto mb-4"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 편집 도구 */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">블록 추가</h3>
          <button
            onClick={saveBlocks}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#12061A] to-[#BA8E4C] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => addBlock('header')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <Type className="w-5 h-5" />
            <span>헤더</span>
          </button>
          <button
            onClick={() => addBlock('text')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <Type className="w-5 h-5" />
            <span>텍스트</span>
          </button>
          <button
            onClick={() => addBlock('image')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
            <span>이미지</span>
          </button>
          <button
            onClick={() => addBlock('video')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <Video className="w-5 h-5" />
            <span>비디오</span>
          </button>
          <button
            onClick={() => addBlock('gallery')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <Grid3x3 className="w-5 h-5" />
            <span>갤러리</span>
          </button>
          <button
            onClick={() => addBlock('link')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <Link2 className="w-5 h-5" />
            <span>링크</span>
          </button>
          <button
            onClick={() => addBlock('divider')}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm flex flex-col items-center gap-2 transition-colors"
          >
            <Minus className="w-5 h-5" />
            <span>구분선</span>
          </button>
        </div>
      </div>

      {/* 블록 리스트 */}
      {blocks.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>블록이 없습니다. 위의 버튼을 눌러 블록을 추가하세요.</p>
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={blocks}
          onReorder={setBlocks}
          className="space-y-4"
        >
          {blocks.map((block) => (
            <Reorder.Item
              key={block.id}
              value={block}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-move"
            >
              <BlockEditor
                block={block}
                isEditing={editingBlock === block.id}
                onEdit={() => setEditingBlock(block.id)}
                onCancel={() => setEditingBlock(null)}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onDelete={() => deleteBlock(block.id)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}

function BlockEditor({
  block,
  isEditing,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
}: {
  block: Block;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
}) {
  const handleContentChange = (field: string, value: any) => {
    onUpdate({
      content: { ...block.content, [field]: value },
    });
  };

  return (
    <div className="flex items-start gap-3">
      <GripVertical className="w-5 h-5 text-gray-400 mt-2 cursor-grab active:cursor-grabbing" />
      
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-3">
            {block.type === 'header' && (
              <>
                <input
                  type="text"
                  value={block.content.text || ''}
                  onChange={(e) => handleContentChange('text', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                  placeholder="헤더 텍스트"
                />
                <select
                  value={block.content.level || 1}
                  onChange={(e) => handleContentChange('level', parseInt(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                >
                  <option value={1}>큰 제목 (H1)</option>
                  <option value={2}>중간 제목 (H2)</option>
                  <option value={3}>작은 제목 (H3)</option>
                </select>
              </>
            )}
            {block.type === 'text' && (
              <textarea
                value={block.content.text || ''}
                onChange={(e) => handleContentChange('text', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white min-h-[100px]"
                placeholder="텍스트 입력"
              />
            )}
            {block.type === 'image' && (
              <>
                <input
                  type="url"
                  value={block.content.url || ''}
                  onChange={(e) => handleContentChange('url', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white mb-2"
                  placeholder="이미지 URL"
                />
                <input
                  type="text"
                  value={block.content.alt || ''}
                  onChange={(e) => handleContentChange('alt', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                  placeholder="이미지 설명"
                />
              </>
            )}
            {block.type === 'video' && (
              <>
                <input
                  type="url"
                  value={block.content.url || ''}
                  onChange={(e) => handleContentChange('url', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white mb-2"
                  placeholder="비디오 URL"
                />
                <input
                  type="text"
                  value={block.content.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                  placeholder="비디오 제목"
                />
              </>
            )}
            {block.type === 'link' && (
              <>
                <input
                  type="url"
                  value={block.content.url || ''}
                  onChange={(e) => handleContentChange('url', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white mb-2"
                  placeholder="링크 URL"
                />
                <input
                  type="text"
                  value={block.content.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white mb-2"
                  placeholder="링크 제목"
                />
                <textarea
                  value={block.content.description || ''}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                  placeholder="링크 설명"
                />
              </>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors"
              >
                완료
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div onClick={onEdit} className="cursor-pointer">
            {renderBlockPreview(block)}
          </div>
        )}
      </div>
    </div>
  );
}

function renderBlockPreview(block: Block) {
  switch (block.type) {
    case 'header':
      const level = block.content.level || 1;
      const headerText = block.content.text || '빈 헤더';
      switch (level) {
        case 1:
          return <h1 className="text-white font-bold">{headerText}</h1>;
        case 2:
          return <h2 className="text-white font-bold">{headerText}</h2>;
        case 3:
          return <h3 className="text-white font-bold">{headerText}</h3>;
        default:
          return <h1 className="text-white font-bold">{headerText}</h1>;
      }
    case 'text':
      return (
        <p className="text-gray-300 whitespace-pre-wrap">
          {block.content.text || '빈 텍스트'}
        </p>
      );
    case 'image':
      return block.content.url ? (
        <img
          src={block.content.url}
          alt={block.content.alt || ''}
          className="w-full rounded-lg"
        />
      ) : (
        <div className="w-full h-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
          이미지 URL을 입력하세요
        </div>
      );
    case 'video':
      return block.content.url ? (
        <div className="w-full rounded-lg bg-black/50 border border-white/10 p-4">
          <p className="text-white font-semibold mb-2">{block.content.title || '비디오'}</p>
          <p className="text-gray-400 text-sm">{block.content.url}</p>
        </div>
      ) : (
        <div className="w-full h-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
          비디오 URL을 입력하세요
        </div>
      );
    case 'link':
      return (
        <a
          href={block.content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <p className="text-white font-semibold">{block.content.title || '링크'}</p>
          {block.content.description && (
            <p className="text-gray-400 text-sm mt-1">{block.content.description}</p>
          )}
        </a>
      );
    case 'divider':
      return <hr className="border-white/10 my-4" />;
    default:
      return <div className="text-gray-400">알 수 없는 블록 타입</div>;
  }
}

