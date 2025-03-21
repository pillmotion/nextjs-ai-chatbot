'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import { useI18n } from '@/locales/client';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const t = useI18n();
  const suggestedActions = [
    {
      title: t('suggestedActions.nextjs.title'),
      label: t('suggestedActions.nextjs.label'),
      action: t('suggestedActions.nextjs.action'),
    },
    {
      title: t('suggestedActions.dijkstra.title'),
      label: t('suggestedActions.dijkstra.label'),
      action: t('suggestedActions.dijkstra.action'),
    },
    {
      title: t('suggestedActions.essay.title'),
      label: t('suggestedActions.essay.label'),
      action: t('suggestedActions.essay.action'),
    },
    {
      title: t('suggestedActions.weather.title'),
      label: t('suggestedActions.weather.label'),
      action: t('suggestedActions.weather.action'),
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
