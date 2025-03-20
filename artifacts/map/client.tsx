import { Artifact } from '@/components/create-artifact';
import { UndoIcon, RedoIcon, CopyIcon } from '@/components/icons';
import { MapEditor } from '@/components/map-editor';
import { toast } from 'sonner';

declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig: { securityJsCode: string };
  }
}

interface MapData {
  location: string;
  coordinates: { latitude: number; longitude: number };
  zoom: number;
}

export const mapArtifact = new Artifact({
  kind: 'map',
  description: 'Useful for map display',
  onStreamPart: ({ streamPart, setArtifact }) => {
    if (streamPart.type === 'map-delta') {
      setArtifact((draft) => {
        try {
          JSON.parse(streamPart.content as string);
          return {
            ...draft,
            content: streamPart.content as string,
            isVisible: true,
            status: 'idle',
          };
        } catch (err) {
          console.error('解析地图数据失败:', err);
          return draft;
        }
      });
    }
  },
  content: MapEditor,
  actions: [
    {
      icon: <UndoIcon size={18} />,
      description: '查看上一版本',
      onClick: ({ handleVersionChange }) => handleVersionChange('prev'),
      isDisabled: ({ currentVersionIndex }) => currentVersionIndex === 0,
    },
    {
      icon: <RedoIcon size={18} />,
      description: '查看下一版本',
      onClick: ({ handleVersionChange }) => handleVersionChange('next'),
      isDisabled: ({ isCurrentVersion }) => isCurrentVersion,
    },
    {
      icon: <CopyIcon size={18} />,
      description: '复制位置信息',
      onClick: ({ content }) => {
        try {
          const mapData = JSON.parse(content) as MapData;
          const locationText = `${mapData.location} (${mapData.coordinates.latitude}, ${mapData.coordinates.longitude})`;
          navigator.clipboard.writeText(locationText);
          toast.success('已复制位置信息！');
        } catch (error) {
          toast.error('复制失败');
        }
      },
    },
  ],
  toolbar: [],
});
