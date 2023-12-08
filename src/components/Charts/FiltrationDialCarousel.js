import React, {useContext, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';

import FiltrationDial from './FiltrationDial';
import i18n from '../../utils/localization/I18n';
import ManagementContext from '../../contexts/ManagementContext';
import {screenWidth} from '../../utils/constants';
import HoursDropDownPickers from './HoursDropDownPickers';

export default function FiltrationDialCarousel({setInfosVisible}) {
  const {customCalendar} = useContext(ManagementContext);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* TODO display a carousel with 3 calendars types */

  function goNext() {
    currentIndex < 2 && carouselRef?.current?.snapToNext();
  }
  function goPrev() {
    currentIndex > 0 && carouselRef?.current?.snapToPrev();
  }

  return (
    <>
      <Carousel
        ref={carouselRef}
        scrollEnabled={false}
        data={[1, 2, 3]}
        renderItem={({index}) => (
          <FiltrationDial
            hoursSlots={customCalendar}
            title={i18n.t('filtration.freeProgram')} // todo change program name
            onPressInfo={setInfosVisible}
            onPressPrev={index > 0 && goPrev}
            onPressNext={index < 2 && goNext}
          />
        )}
        onSnapToItem={index => setCurrentIndex(index)}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
      {currentIndex === 0 ? <HoursDropDownPickers /> : null}
    </>
  );
}
