import {nanoid} from 'nanoid';
import { memo } from 'react';

const IMAGES_COUNT_LIMIT = 6;

type PlaceImagesScreenProps = {
  images: string[];
}

function PlaceImagesScreen({images}: PlaceImagesScreenProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images
          .slice(0, IMAGES_COUNT_LIMIT)
          .map((image) => (
            <div key={nanoid(10)} className="property__image-wrapper">
              <img className="property__image" src={`${image}`} alt="View studio"/>
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(PlaceImagesScreen, (prevProps, nextProps) =>
  prevProps.images === nextProps.images,
);
