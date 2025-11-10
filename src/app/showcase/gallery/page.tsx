'use client';

import React, { useState } from 'react';
import { Container } from '@mui/material';
import {
  GalleryHeader,
  GalleryFilters,
  GalleryGrid,
  ImageDialog,
  galleryData,
  type DeviceCategory,
  type FunctionalCategory,
  type GalleryItem,
  DEVICE_CATEGORIES,
  FUNCTIONAL_CATEGORIES,
} from '@/components/showcase/gallery';
import { useLocale } from '@/contexts/LocaleContext';

export default function GalleryPage() {
  const { t } = useLocale();
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState<DeviceCategory>(
    DEVICE_CATEGORIES.ALL
  );
  const [selectedFunctionalCategory, setSelectedFunctionalCategory] = useState<FunctionalCategory>(
    FUNCTIONAL_CATEGORIES.ALL
  );
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Фильтрация по двум критериям
  const filteredItems = galleryData.items.filter((item) => {
    const deviceMatch =
      selectedDeviceCategory === DEVICE_CATEGORIES.ALL ||
      item.deviceCategory === selectedDeviceCategory;
    const functionalMatch =
      selectedFunctionalCategory === FUNCTIONAL_CATEGORIES.ALL ||
      item.functionalCategory === selectedFunctionalCategory;
    return deviceMatch && functionalMatch;
  });

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  // Подсчет элементов для каждой категории
  const getDeviceCategoryCount = (categoryKey: DeviceCategory) => {
    if (categoryKey === DEVICE_CATEGORIES.ALL) {
      return galleryData.items.filter((item) => {
        const functionalMatch =
          selectedFunctionalCategory === FUNCTIONAL_CATEGORIES.ALL ||
          item.functionalCategory === selectedFunctionalCategory;
        return functionalMatch;
      }).length;
    }
    return galleryData.items.filter((item) => {
      const deviceMatch = item.deviceCategory === categoryKey;
      const functionalMatch =
        selectedFunctionalCategory === FUNCTIONAL_CATEGORIES.ALL ||
        item.functionalCategory === selectedFunctionalCategory;
      return deviceMatch && functionalMatch;
    }).length;
  };

  const getFunctionalCategoryCount = (categoryKey: FunctionalCategory) => {
    if (categoryKey === FUNCTIONAL_CATEGORIES.ALL) {
      return galleryData.items.filter((item) => {
        const deviceMatch =
          selectedDeviceCategory === DEVICE_CATEGORIES.ALL ||
          item.deviceCategory === selectedDeviceCategory;
        return deviceMatch;
      }).length;
    }
    return galleryData.items.filter((item) => {
      const deviceMatch =
        selectedDeviceCategory === DEVICE_CATEGORIES.ALL ||
        item.deviceCategory === selectedDeviceCategory;
      const functionalMatch = item.functionalCategory === categoryKey;
      return deviceMatch && functionalMatch;
    }).length;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <GalleryHeader title={t('gallery.title')} subtitle={t('gallery.subtitle')} />

      <GalleryFilters
        deviceCategories={galleryData.deviceCategories}
        functionalCategories={galleryData.functionalCategories}
        selectedDeviceCategory={selectedDeviceCategory}
        selectedFunctionalCategory={selectedFunctionalCategory}
        onDeviceCategoryChange={setSelectedDeviceCategory}
        onFunctionalCategoryChange={setSelectedFunctionalCategory}
        getDeviceCategoryCount={getDeviceCategoryCount}
        getFunctionalCategoryCount={getFunctionalCategoryCount}
      />

      <GalleryGrid items={filteredItems} onImageClick={handleImageClick} />

      <ImageDialog selectedImage={selectedImage} onClose={handleCloseDialog} />
    </Container>
  );
}
