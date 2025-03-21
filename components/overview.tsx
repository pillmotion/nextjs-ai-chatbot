'use client';

import { motion } from 'framer-motion';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { useI18n } from "@/locales/client";

export const Overview = () => {
  const t = useI18n();

  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="w-full h-[500px] bg-gradient-to-b from-background to-background/80 relative overflow-hidden mb-8 rounded-xl border border-muted/20">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 from-primary/20 via-primary/10 to-transparent dark:from-primary/30 dark:via-primary/20 dark:to-transparent"
          size={260}
        />

        <div className="flex flex-col md:flex-row h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/60">
              {t('overview.title')}
            </h1>
            <p className="mt-4 text-foreground/80 max-w-lg dark:text-foreground/70">
              {t('overview.description')}
            </p>
          </div>

          {/* Right content */}
          <div className="flex-1 relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};