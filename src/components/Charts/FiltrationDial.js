import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {
  Circle,
  Polygon,
  G,
  Line,
  Path,
  Text as SvgText,
} from 'react-native-svg';
import {Card, IconButton, Text} from 'react-native-paper';

import Alignments from '../../theme/Alignments';
import Colors from '../../theme/Colors';

import {screenWidth} from '../../utils/constants';
import CustomButton from '../Button/CustomButton';
import i18n from '../../utils/localization/I18n';
import Fonts from '../../theme/Fonts';
import RunningStateIndicator from '../RunningState/RunningStateIndicator';
import ManagementContext from '../../contexts/ManagementContext';
import FilterChip from './FilterChip';
import {formatFromMinFromMidnight} from '../../utils/TimeService';
import {useMutation} from '@apollo/client';
import ManagementApi from '../../api/GQL/ManagementApi';
import {errorAlert} from '../../utils/Alert/errorAlert';

const width = screenWidth - 100;

export default function FiltrationDial({
  freeProgram,
  title,
  titleIcon,
  onPressCard, // means card is on home page
  hoursSlots,
  onPressInfo,
  onPressNext,
  onPressPrev,
}) {
  const {water, getManagementInfos} = useContext(ManagementContext);
  const hoursArray = new Array(24).fill(1); // declare an array of 24 items for hours
  const center = width / 2;
  const radius = (width - 55) / 2;

  // gql
  const [setFiltrationStop1h, {loading: setFiltrationStop1hLoading}] =
    useMutation(ManagementApi.setFiltrationStop1h, {
      onCompleted({setFiltrationStop1h: returnValue}) {
        if (returnValue) {
          getManagementInfos();
        }
      },
      onError() {
        return errorAlert();
      },
    });

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function hourSticks() {
    return hoursArray.map((hour, index) => {
      const start = polarToCartesian(center, center, radius - 8, index * 15);
      const end = polarToCartesian(center, center, radius, index * 15);
      const time = polarToCartesian(center, center, radius - 20, index * 15);

      return (
        <G key={index} fill={'red'}>
          <Line
            stroke={Colors.black}
            strokeWidth={1.5}
            strokeLinecap="round"
            x1={start.x}
            x2={end.x}
            y1={start.y}
            y2={end.y}
          />
          {index % 2 === 0 ? (
            <SvgText
              textAnchor="middle"
              fontSize="12"
              fontFamily="Lexend-Light"
              fontWeight="300"
              fill={Colors.black}
              alignmentBaseline="central"
              x={time.x}
              y={time.y}>
              {index}
            </SvgText>
          ) : null}
        </G>
      );
    });
  }

  function backgroundEmptyCircle() {
    return (
      <Circle
        cx={center}
        cy={center}
        r={radius + 10}
        fill={Colors.transparent}
        stroke={Colors.LAGOON}
        strokeWidth={6}
        opacity={0.25}
      />
    );
  }

  // function to draw hour slots segments on background circle
  // it calcultes automatically by start and end hours
  function drawRoundHourSlot({startHour, endHour}) {
    const startHours = startHour?.split(':')[0];
    const startMins = startHour?.split(':')[1];
    const endHours = endHour?.split(':')[0];
    const endMins = endHour?.split(':')[1];
    // convert hours and minutes into a float to display on circle
    const start = parseFloat(startHours) + parseFloat(startMins) / 60;
    const end = parseFloat(endHours) + parseFloat(endMins) / 60;

    const diff = end > start ? end - start : 24 - start + end;
    const angle = (diff * 360) / 24;
    const startPoint = (start * 360) / 24;
    const coords = [];
    for (var i = 0; i <= angle; i++) {
      var x =
        (radius + 10) * Math.cos(((i + startPoint - 90) * Math.PI) / 180) +
        center;
      var y =
        (radius + 10) * Math.sin(((i + startPoint - 90) * Math.PI) / 180) +
        center;
      coords.push((i === 0 ? 'M' : 'L') + x + ',' + y);
    }
    return coords.join(' ');
  }

  function renderHourSlots() {
    return hoursSlots?.map((item, index) => {
      if (item?.start !== null && item?.end !== null) {
        return (
          <Path
            key={index?.toString()}
            id="path"
            fill={Colors.transparent}
            stroke={Colors.LAGOON}
            strokeWidth={6}
            d={drawRoundHourSlot({
              startHour: formatFromMinFromMidnight(item.start),
              endHour: formatFromMinFromMidnight(item.end),
            })}
          />
        );
      }
    });
  }

  // this function return a triangle witch indicates actual hour on the clock
  function renderActualIndicator() {
    const distanceFromCenter = radius + 17;
    const actualTimeFloat =
      new Date()?.getHours() + new Date()?.getMinutes() / 60;
    // first point of triangle -> closest to the clock
    const anchor1 = polarToCartesian(
      center,
      center,
      distanceFromCenter,
      actualTimeFloat * 15,
    );
    // second point
    const anchor2 = polarToCartesian(
      center,
      center,
      distanceFromCenter + 10,
      actualTimeFloat * 15 + 3, // we had 3 degrees to drow point next to first point
    );
    // third point
    const anchor3 = polarToCartesian(
      center,
      center,
      distanceFromCenter + 10,
      actualTimeFloat * 15 - 3, // we remove 3 degrees to drow point next to first and second point
    );
    return (
      // triangle
      <Polygon
        points={`${anchor1.x},${anchor1.y} ${anchor2.x},${anchor2.y} ${anchor3.x},${anchor3.y}`}
        fill={Colors.black}
      />
    );
  }

  function renderMiddleContent() {
    return (
      <View style={styles.middleContainer}>
        {freeProgram && onPressCard ? (
          <Text style={styles.middleText}>
            {i18n.t('filtration.freeProgram')}
          </Text>
        ) : null}
        <CustomButton
          text={
            !water?.filtration?.stop1hState
              ? i18n.t('filtration.oneHourStop')
              : i18n.t('filtration.replay')
          }
          onPress={() =>
            setFiltrationStop1h({
              variables: {value: !water?.filtration?.stop1hState},
            })
          }
          red={!water?.filtration?.stop1hState}
          green={water?.filtration?.stop1hState}
          icon={
            !water?.filtration?.stop1hState ? 'pause-circle-outline' : 'play'
          }
          mode="outlined"
          loading={setFiltrationStop1hLoading}
        />
      </View>
    );
  }

  function renderTitle() {
    return (
      <View style={styles.titleCtnr}>
        {titleIcon ? (
          <MaterialCommunityIcons
            name={titleIcon}
            size={24}
            style={[styles.icon]}
            color={Colors.black}
          />
        ) : null}
        <Text style={[Fonts.textBlack, Alignments.textCenter]}>{title}</Text>
        {onPressCard ? (
          <MaterialCommunityIcons
            name={'chevron-right'}
            size={24}
            style={[styles.chevron]}
            color={Colors.TEXT_A_DARK_A_HIGH_EMPHASIS_TEXT_PRIMARY}
          />
        ) : onPressInfo ? (
          <MaterialCommunityIcons
            name={'information'}
            size={24}
            style={[styles.chevron]}
            color={Colors.PRIMARY}
            onPress={onPressInfo}
          />
        ) : null}
      </View>
    );
  }

  function renderBottom() {
    return (
      <View style={[styles.bottomContainer]}>
        {onPressCard ? (
          <RunningStateIndicator
            item={i18n.t('filtration.filtration')}
            running={water?.filtration?.status}
          />
        ) : (
          <>
            <FilterChip
              selected={true}
              name={i18n.t('filtration.planned')}
              color={Colors.LAGOON}
              icon="clock-time-four-outline"
            />
            <FilterChip
              selected={true}
              name={i18n.t('filtration.possibleRun')}
              color={Colors.PASTEQUE}
              icon="clock-time-four-outline"
            />
            <Text style={styles.dailyTime}>
              {i18n.t('filtration.dailyTime')}
            </Text>
            <Text style={Alignments.selfCenter}>{`${
              getTotalDuration()?.hours
            } h ${getTotalDuration()?.mins || ''}`}</Text>
          </>
        )}
      </View>
    );
  }

  function getTotalDuration() {
    return hoursSlots?.reduce(
      (res, item) => {
        if (item.start !== null && item.end !== null) {
          const startHours = formatFromMinFromMidnight(item.start)?.split(
            ':',
          )[0];
          const startMins = formatFromMinFromMidnight(item.start)?.split(
            ':',
          )[1];
          const endHours = formatFromMinFromMidnight(item.end)?.split(':')[0];
          const endMins = formatFromMinFromMidnight(item.end)?.split(':')[1];
          // convert hours and minutes into a float to display on circle
          const start = parseFloat(startHours) + parseFloat(startMins) / 60;
          const end = parseFloat(endHours) + parseFloat(endMins) / 60;
          const diff = end > start ? end - start : 24 - start + end;
          const tmp = res;
          tmp.hours += Math.trunc(diff);
          tmp.mins += parseFloat(((diff - Math.trunc(diff)) * 60).toFixed(2));
          if (tmp.mins === 60) {
            tmp.hours++;
            tmp.mins = 0;
          }
          res = tmp;
        }
        return res;
      },
      {hours: 0, mins: 0},
    );
  }

  return (
    <Card style={styles.card} onPress={onPressCard}>
      {renderTitle()}
      <View style={styles.paddingView}>
        <View>
          {renderMiddleContent()}
          <Svg height={width} width={width} style={styles.container}>
            <G>{hourSticks()}</G>
            {backgroundEmptyCircle()}
            {renderHourSlots()}
            {renderActualIndicator()}
          </Svg>
        </View>
        {onPressPrev ? (
          <IconButton
            icon="chevron-left"
            color={Colors.black}
            size={28}
            onPress={onPressPrev}
            style={styles.leftChevron}
          />
        ) : null}
        {onPressNext ? (
          <IconButton
            icon="chevron-right"
            color={Colors.black}
            size={28}
            onPress={onPressNext}
            style={styles.rightChevron}
          />
        ) : null}
        {renderBottom()}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Alignments.selfCenter,
  },
  middleContainer: {
    position: 'absolute',
    top: 60,
    bottom: 60,
    zIndex: 1,
    right: 60,
    left: 60,
    ...Alignments.center,
    backgroundColor: Colors.transparent,
  },
  card: {
    marginHorizontal: 31,
    paddingTop: 7,
    paddingBottom: 24,
    marginTop: 16,
  },
  paddingView: {paddingHorizontal: 31},
  middleText: {
    fontSize: 12,
    ...Fonts.light,
    ...Alignments.textCenter,
    marginBottom: 5,
  },
  titleCtnr: {
    ...Alignments.row,
    ...Alignments.center,
    marginBottom: 8,
  },
  icon: {
    marginRight: 11,
  },
  chevron: {
    position: 'absolute',
    right: 10,
  },
  bottomContainer: {
    marginTop: 16,
    ...Alignments.center,
  },
  dailyTime: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
    color: Colors.TEXT_A_DARK_B_MEDIUM_EMPHASIS_TEXT_SECONDARY,
    ...Fonts.uppercase,
    marginTop: 16,
    ...Alignments.selfCenter,
    marginBottom: 3,
  },
  leftChevron: {
    backgroundColor: Colors.SECONDARY,
    position: 'absolute',
    top: '30%',
    left: -28,
  },
  rightChevron: {
    backgroundColor: Colors.SECONDARY,
    position: 'absolute',
    top: '30%',
    right: -28,
  },
});
