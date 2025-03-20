import { createDocumentHandler } from '@/lib/artifacts/server';

const AMAP_KEY = process.env.AMAP_KEY || '';
if (!AMAP_KEY) throw new Error('请配置高德地图 API Key');

interface MapData {
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  zoom: number;
}

export const mapDocumentHandler = createDocumentHandler<'map'>({
  kind: 'map',
  onCreateDocument: async ({ title, dataStream }) => {
    const address = title.replace(' Map', '');
    return await getLocationData(address, dataStream);
  },
  onUpdateDocument: async ({ description, dataStream }) => {
    return await getLocationData(description, dataStream);
  },
});

async function getLocationData(
  address: string,
  dataStream: any,
): Promise<string> {
  try {
    const url = new URL('https://restapi.amap.com/v3/geocode/geo');
    url.searchParams.set('key', AMAP_KEY); // 现在 AMAP_KEY 一定是字符串类型
    url.searchParams.set('address', address);
    url.searchParams.set('output', 'json');

    const response = await fetch(url.toString());
    const data = await response.json();

    const mapData: MapData =
      data.status === '1' && data.geocodes?.[0]
        ? {
            location: data.geocodes[0].formatted_address,
            coordinates: {
              longitude: Number(data.geocodes[0].location.split(',')[0]),
              latitude: Number(data.geocodes[0].location.split(',')[1]),
            },
            zoom: 12,
          }
        : {
            location: '浙江省丽水市莲都区',
            coordinates: { latitude: 28.441, longitude: 119.92265 },
            zoom: 12,
          };

    const content = JSON.stringify(mapData);
    dataStream.writeData({ type: 'map-delta', content });
    return content;
  } catch (error) {
    console.error('地图数据获取失败:', error);
    throw error;
  }
}
