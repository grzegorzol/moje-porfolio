import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Tablet, X, Maximize2, Minimize2 } from 'lucide-react';

interface LivePreviewProps {
  content: string;
  title?: string;
  onClose?: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const deviceSizes: Record<DeviceType, { width: string; label: string }> = {
  desktop: { width: '100%', label: 'Desktop' },
  tablet: { width: '768px', label: 'Tablet' },
  mobile: { width: '375px', label: 'Mobile' }
};

export function LivePreview({ content, title, onClose }: LivePreviewProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-background' 
          : 'relative'
      }`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Podgląd:</span>
          {title && <span className="text-sm font-semibold">{title}</span>}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDevice('mobile')}
            className={device === 'mobile' ? 'bg-accent' : ''}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDevice('tablet')}
            className={device === 'tablet' ? 'bg-accent' : ''}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDevice('desktop')}
            className={device === 'desktop' ? 'bg-accent' : ''}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
          
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className={`flex justify-center p-4 bg-muted/30 ${isFullscreen ? 'h-[calc(100vh-60px)]' : 'min-h-[400px]'} overflow-auto`}>
        <motion.div
          layout
          className="bg-background border border-border rounded-lg shadow-lg overflow-hidden"
          style={{
            width: deviceSizes[device].width,
            maxWidth: '100%',
            height: isFullscreen ? '100%' : 'auto',
            minHeight: '300px'
          }}
        >
          <div className="p-6">
            <article 
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </motion.div>
      </div>

      {/* Device indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
          {deviceSizes[device].label}
        </span>
      </div>
    </motion.div>
  );
}
