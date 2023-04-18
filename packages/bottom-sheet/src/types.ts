import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import type { TransitionProps } from 'react-transition-group/Transition';

import type { BaseModalProps } from '@alfalab/core-components-base-modal';
import type { NavigationBarProps } from '@alfalab/core-components-navigation-bar';

import type { BackgroundColorType } from '../../types';

export type BottomSheetTitleAlign = 'center' | 'left';

export type BottomSheetProps = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Управление видимостью
     */
    open: boolean;

    /**
     * Заголовок
     */
    title?: ReactNode;

    /**
     * Размер заголовка
     */
    titleSize?: NavigationBarProps['titleSize'];

    /**
     * Подзаголовок.
     */
    subtitle?: NavigationBarProps['subtitle'];

    /**
     * Кнопка действия (обычно, это кнопка закрытия)
     */
    actionButton?: ReactNode;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: BaseModalProps['container'];

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс
     */
    contentClassName?: string;

    /**
     * Дополнительные пропсы на контейнер.
     */
    containerProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Дополнительный класс
     */
    containerClassName?: string;

    /**
     * Цвет фона
     */
    backgroundColor?: Extract<BackgroundColorType, 'primary' | 'secondary'>;

    /**
     * Дополнительный класс шапки
     */
    headerClassName?: string;

    /**
     * Дополнительный класс футера
     */
    footerClassName?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;

    /**
     * Дополнительный класс для компонента крестика
     */
    closerClassName?: string;

    /**
     * Дополнительный класс для компонента стрелки назад
     */
    backerClassName?: string;

    /**
     * Дополнительный класс для компонента модального окна
     */
    modalClassName?: string;

    /**
     * Дополнительный класс для обертки модального окна
     */
    modalWrapperClassName?: string;

    /**
     * TransitionProps, прокидываются в компонент CSSTransitionProps.
     */
    transitionProps?: Partial<TransitionProps>;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Будет ли свайпаться шторка
     * @default true
     */
    swipeable?: boolean;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: boolean;

    /**
     * Наличие компонента стрелки назад
     */
    hasBacker?: boolean;

    /**
     * Выравнивание заголовка
     */
    titleAlign?: BottomSheetTitleAlign;

    /**
     * Фиксирует шапку
     */
    stickyHeader?: boolean;

    /**
     * Фиксирует футер
     */
    stickyFooter?: boolean;

    /**
     * Высота шторки
     */
    initialHeight?: 'default' | 'full';

    /**
     * Будет ли виден оверлэй
     */
    hideOverlay?: boolean;

    /**
     * Будет ли видна шапка
     */
    hideHeader?: boolean;

    /**
     * Будет ли обрезан заголовок
     */
    trimTitle?: boolean;

    /**
     * Запретить закрытие шторки кликом на оверлэй
     */
    disableOverlayClick?: boolean;

    /**
     * Отключает блокировку скролла при открытии модального окна
     */
    disableBlockingScroll?: boolean;

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Не анимировать шторку при изменении размера вьюпорта
     */
    ignoreScreenChange?: boolean;

    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: BaseModalProps['backdropProps'];

    /**
     * Реф на контейнер, в котором происходит скролл
     */
    scrollableContainerRef?: RefObject<HTMLElement>;

    /**
     * Реф для управления компонентом.
     */
    bottomSheetInstanceRef?: RefObject<{ scrollToArea: (idx: number) => void }>;

    /**
     * Реф на контейнер, в котором находится шторка
     */
    sheetContainerRef?: RefObject<HTMLElement>;

    /**
     * Магнитные области видимой высоты шторки.
     * Можно использовать значения в пикселях - 10(число), либо в процентах - 10%(строка).
     * По-умолчанию -[0, window.innerHeight - '24px']
     * массив должен состоять минимум из 2 элементов
     */
    magneticAreas?: number[];

    /**
     * Индекс точки из magneticAreas, к которому нужно примагнититься при первом открытии шторки.
     */
    initialActiveAreaIndex?: number;

    /**
     * Отключает скролл контентной области.
     */
    scrollLocked?: boolean;

    /**
     * Скрыть скроллбар внутри шторки
     */
    hideScrollbar?: boolean;

    /**
     * Обработчик закрытия
     */
    onClose: () => void;

    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;

    /**
     * Вызывается после притягивания к одной из `magneticAreas`
     */
    onMagnetize?: (index: number) => void;
};