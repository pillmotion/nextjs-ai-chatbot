import { useEffect, useRef, useState, useMemo } from 'react';
import { LoaderIcon } from 'lucide-react';
import cn from 'classnames';

interface MapEditorProps {
  content: string;
  status: string;
  isInline: boolean;
}

// 全局脚本加载控制
let loadMapScriptPromise: Promise<void> | null = null;

const loadMapScript = () => {
  if (loadMapScriptPromise) return loadMapScriptPromise;
  if (window.AMap) return Promise.resolve();

  loadMapScriptPromise = new Promise((resolve, reject) => {
    try {
      // 先设置安全配置
      window._AMapSecurityConfig = {
        securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || '',
      };

      // 检查是否已存在脚本
      const existingScript = document.querySelector(
        'script[src*="webapi.amap.com"]',
      );
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}`;
      script.async = true;

      // 确保清理失败的加载
      const cleanup = () => {
        loadMapScriptPromise = null;
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        cleanup();
        reject(new Error('加载地图脚本失败'));
      };

      document.head.appendChild(script);
    } catch (error) {
      loadMapScriptPromise = null;
      reject(error);
    }
  });

  return loadMapScriptPromise;
};

export function MapEditor({ content, status, isInline }: MapEditorProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerId = useMemo(
    () => `map-${Math.random().toString(36).slice(2)}`,
    [],
  );

  // 解析地图数据
  const mapData = useMemo(() => {
    try {
      return content ? JSON.parse(content) : null;
    } catch (err) {
      return null;
    }
  }, [content]);

  // 初始化和清理地图
  useEffect(() => {
    if (!content || status === 'streaming' || !mapData) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    async function initMap() {
      try {
        if (!window.AMap) {
          await loadMapScript();
        }

        // 清理旧实例
        if (mapRef.current) {
          mapRef.current.destroy();
          mapRef.current = null;
          markerRef.current = null;
        }

        // 创建新地图
        const map = new window.AMap.Map(container, {
          zoom: isInline ? mapData.zoom || 12 : (mapData.zoom || 12) + 2,
          center: [mapData.coordinates.longitude, mapData.coordinates.latitude],
          resizeEnable: true,
          viewMode: '2D',
          showIndoorMap: false,
          animateEnable: !isInline,
          dragEnable: !isInline,
          zoomEnable: !isInline,
          touchZoom: !isInline,
          passiveEvents: true,
        });

        // 添加标记
        const marker = new window.AMap.Marker({
          position: [
            mapData.coordinates.longitude,
            mapData.coordinates.latitude,
          ],
        });

        map.add(marker);
        markerRef.current = marker;
        mapRef.current = map;
        setIsLoading(false);
      } catch (err) {
        console.error('地图初始化失败:', err);
        setIsLoading(false);
      }
    }

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [content, status, containerId, mapData, isInline]);

  return (
    <div
      className={cn('flex flex-row items-center justify-center w-full', {
        'h-[calc(100dvh-60px)]': !isInline,
        'h-[257px]': isInline,
      })}
    >
      {status === 'streaming' ? (
        <div className="flex flex-row gap-4 items-center">
          <div className="animate-spin">
            <LoaderIcon />
          </div>
          <div>加载地图中...</div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <div
            id={containerId}
            className="w-full h-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
            style={{
              minHeight: isInline ? '257px' : '100%',
            }}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <div className="flex flex-row gap-4 items-center">
                <div className="animate-spin">
                  <LoaderIcon />
                </div>
                <div>加载地图中...</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
