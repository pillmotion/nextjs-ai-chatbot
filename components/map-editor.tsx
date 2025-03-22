import { useEffect, useRef, useState, useMemo } from 'react';
import { LoaderIcon } from 'lucide-react';
import cn from 'classnames';

interface MapEditorProps {
  content: string;
  status: string;
  isInline: boolean;
}

// 全局脚本状态
let isScriptInitiated = false;
let mapScriptLoaded = false;

export function MapEditor({ content, status, isInline }: MapEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 解析地图数据
  const mapData = useMemo(() => {
    try {
      return content ? JSON.parse(content) : null;
    } catch (err) {
      console.warn('解析地图数据失败:', err);
      return null;
    }
  }, [content]);

  // 加载脚本
  const loadMapScript = async (): Promise<void> => {
    // 如果脚本已加载，直接返回
    if (mapScriptLoaded || (typeof window !== 'undefined' && window.AMap)) {
      mapScriptLoaded = true;
      return Promise.resolve();
    }

    // 如果脚本未初始化
    if (!isScriptInitiated && typeof window !== 'undefined') {
      isScriptInitiated = true;

      console.log('初始化地图脚本加载');

      // 设置安全配置
      window._AMapSecurityConfig = {
        securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || '',
      };

      // 返回加载脚本的Promise
      return new Promise<void>((resolve, reject) => {
        try {
          const script = document.createElement('script');
          script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}`;
          script.async = true;

          script.onload = () => {
            console.log('地图脚本加载成功');
            mapScriptLoaded = true;
            resolve();
          };

          script.onerror = (e) => {
            console.error('地图脚本加载失败:', e);
            reject(new Error('地图脚本加载失败'));
          };

          document.head.appendChild(script);
        } catch (err) {
          console.error('添加脚本标签失败:', err);
          reject(err);
        }
      });
    }

    // 等待AMap对象可用 - 设置超时
    return new Promise<void>((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50; // 最多尝试50次，每次100ms

      const checkAMap = () => {
        if (window.AMap) {
          console.log('AMap对象已可用');
          mapScriptLoaded = true;
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('等待地图API超时'));
        } else {
          attempts++;
          setTimeout(checkAMap, 100);
        }
      };

      checkAMap();
    });
  };

  // 初始化地图 - 修改渲染逻辑，确保容器总是存在
  useEffect(() => {
    // 如果没有数据或正在流式传输，不做任何操作
    if (!mapData || status === 'streaming') {
      return;
    }

    let isMounted = true;
    console.log('开始初始化地图, 数据:', mapData);

    // 等待DOM更新后再初始化地图
    const timer = setTimeout(() => {
      const initMap = async () => {
        try {
          // 首先加载脚本
          await loadMapScript();

          // 检查组件是否仍挂载
          if (!isMounted) {
            console.log('组件已卸载，停止初始化');
            return;
          }

          // 在此处检查容器
          if (!containerRef.current) {
            console.error('地图容器元素不存在，可能是DOM未完成渲染');
            throw new Error('地图容器不存在');
          }

          console.log('容器已找到，准备创建地图实例');

          // 清理旧实例
          if (mapInstanceRef.current) {
            try {
              console.log('销毁旧地图实例');
              mapInstanceRef.current.destroy();
            } catch (err) {
              console.warn('销毁旧地图实例失败:', err);
            }
            mapInstanceRef.current = null;
          }

          // 确保容器已清空
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }

          console.log('创建新地图实例');

          // 创建地图实例
          const map = new window.AMap.Map(containerRef.current, {
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

          // 保存实例引用
          mapInstanceRef.current = map;

          // 添加标记
          const marker = new window.AMap.Marker({
            position: [
              mapData.coordinates.longitude,
              mapData.coordinates.latitude,
            ],
          });

          map.add(marker);

          // 地图加载完成
          console.log('地图创建成功');
          if (isMounted) {
            setIsLoading(false);
            setError(null);
          }
        } catch (err) {
          console.error('地图初始化失败:', err);
          if (isMounted) {
            setError(err instanceof Error ? err.message : String(err));
            setIsLoading(false);
          }
        }
      };

      initMap();
    }, 100); // 给DOM一点时间来渲染

    return () => {
      console.log('地图组件卸载');
      clearTimeout(timer);
      isMounted = false;
      // 清理地图实例
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (err) {
          console.warn('清理地图实例失败:', err);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [mapData, status, isInline]);

  // 修改渲染逻辑 - 始终渲染容器，只是显示/隐藏加载状态
  return (
    <div
      className={cn('flex flex-row items-center justify-center w-full', {
        'h-[calc(100dvh-60px)]': !isInline,
        'h-[257px]': isInline,
      })}
    >
      <div className="relative w-full h-full">
        {/* 始终渲染地图容器 */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
          style={{
            minHeight: isInline ? '257px' : '100%',
          }}
        />

        {/* 加载中或流式传输时显示加载状态 */}
        {(status === 'streaming' || isLoading) && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-zinc-800/50">
            <div className="flex flex-row gap-4 items-center">
              <div className="animate-spin">
                <LoaderIcon />
              </div>
              <div>加载地图中...</div>
            </div>
          </div>
        )}

        {/* 错误状态显示 */}
        {error && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-800/80">
            <div className="text-red-500 p-4 text-center">
              <p>地图加载失败</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}