import React, {useContext} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import I18n from 'i18n-js';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';
import {HOURS} from '../../utils/constants';
import DropDownPickerComponent from '../../components/DropDownPicker/DropDownPickerComponent';
import CustomButton from '../../components/Button/CustomButton';
import {IconButton} from 'react-native-paper';
import ManagementContext from '../../contexts/ManagementContext';
import {errorAlert} from '../../utils/Alert/errorAlert';
import {
  formatFromMinFromMidnight,
  formatToMinFromMidnight,
} from '../../utils/TimeService';
import {showConfirmAlert} from '../../utils/Alert/showConfirmAlert';

const pickerValuesHours = HOURS.reduce((res, val) => {
  res.push({label: val, value: val});
  return res;
}, []);

// component wich displays dropdown pickers fields for filtration custom calendar
export default function HoursDropDownPickers() {
  const {customCalendar, setCustomCalendar} = useContext(ManagementContext);

  function isOverLaping({slot, index}) {
    let returnValue = false;
    customCalendar?.map((item, itemIndex) => {
      if (slot?.start !== null && slot?.end !== null && itemIndex !== index) {
        if (item?.start <= slot?.start && item?.end >= slot?.start) {
          returnValue = true;
        } else if (item?.start <= slot?.end && item?.end >= slot?.end) {
          returnValue = true;
        } else if (item?.start > slot?.start && item?.end < slot?.end) {
          returnValue = true;
        }
      }
    });
    return returnValue;
  }

  function updateHoursValue({value, index, start}) {
    const tmp = [...customCalendar];
    tmp[index] = {
      start: start ? formatToMinFromMidnight(value) : tmp[index].start,
      end: !start ? formatToMinFromMidnight(value) : tmp[index].end,
      __typename: 'CalendarEntry',
      calendarType: 1,
    };
    if (isOverLaping({slot: tmp[index], index})) {
      errorAlert(I18n.t('filtration.invalidHourSlot'), () =>
        resetHoursSlot({index}),
      );
    } else {
      setCustomCalendar(tmp);
    }
  }

  function resetHoursSlot({index}) {
    const tmp = [...customCalendar];
    tmp[index] = {
      start: null,
      end: null,
      __typename: 'CalendarEntry',
      calendarType: 1,
    };
    setCustomCalendar(tmp);
  }

  function addHourSlot() {
    setCustomCalendar(value => [
      ...value,
      {
        start: null,
        end: null,
        calendarType: 1,
        __typename: 'CalendarEntry',
      },
    ]);
  }

  function deleteHourSlot(index) {
    showConfirmAlert({
      title: I18n.t('filtration.deleteRow'),
      onConfirm: () => {
        const tmp = [...customCalendar];
        tmp.splice(index, 1);
        setCustomCalendar(tmp);
      },
    });
  }

  return (
    <View style={styles.hoursCtnr}>
      {customCalendar?.map((item, index) => {
        return (
          <View
            key={index?.toString()}
            style={[
              styles.hoursRowCtnr,
              {
                zIndex:
                  Platform.OS === 'ios'
                    ? 1000 * customCalendar?.length - index
                    : undefined,
              }, // avoid fields to be under next fields for iOS
            ]}>
            <View style={[styles.pickerCtnr]}>
              <DropDownPickerComponent
                key={`${index}start`}
                pickerItems={pickerValuesHours}
                selectedValue={formatFromMinFromMidnight(item?.start)}
                setSelectedValue={value =>
                  updateHoursValue({value: value(), index, start: true})
                }
                placeholder={I18n.t('filtration.startHour')}
                emptyValue="-- : --"
                zIndex={1000 * customCalendar?.length - index}
                zIndexInverse={1000 - index}
                small
              />
            </View>
            <View>
              <DropDownPickerComponent
                key={`${index}end`}
                pickerItems={pickerValuesHours}
                selectedValue={formatFromMinFromMidnight(item?.end)}
                setSelectedValue={value =>
                  updateHoursValue({value: value(), index, start: false})
                }
                placeholder={I18n.t('filtration.endHour')}
                emptyValue="-- : --"
                zIndex={1000 * customCalendar?.length - index}
                zIndexInverse={1000 - index}
                small
              />
            </View>
            {index > 0 ? (
              <IconButton
                icon="delete"
                color={Colors.PRIMARY}
                size={26}
                onPress={() => deleteHourSlot(index)}
              />
            ) : null}
          </View>
        );
      })}
      <CustomButton
        text={I18n.t('filtration.addHourSlot')}
        onPress={addHourSlot}
        icon="plus"
        customStyle={[styles.btn, Alignments.selfStretch]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hoursRowCtnr: {
    ...Alignments.row,
  },
  hoursCtnr: {
    marginTop: 18,
    marginHorizontal: 31,
    marginBottom: 32,
  },
  pickerCtnr: {marginRight: 12},
  btn: {
    zIndex: -1,
    elevation: -1,
  },
});
