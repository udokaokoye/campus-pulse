import { AppText } from '@/components/AppText';
import EventCard from '@/components/EventCard';
import { ACCENT_COLOR, colorCombos } from '@/utils/constants';
import { Event } from '@/utils/types';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Icon } from '@rneui/base';
import { Image } from 'expo-image';
import { GoogleMaps } from 'expo-maps';
import { GoogleMapsColorScheme } from 'expo-maps/build/google/GoogleMaps.types';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, PermissionsAndroid, Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import MapView, { Marker } from 'react-native-maps';
import RenderHTML from 'react-native-render-html';
export default function HomeScreen() {
  const [initialPostion, setinitialPostion] = useState({
    latitude: 39.129894,
    longitude: -84.516852,
    latitudeDelta: 0.01,  // Adjust this value to zoom in more or less
    longitudeDelta: 0.01
  })
  const [events, setevents] = useState<any>([]);
  const [selectedEvent, setselectedEvent] = useState<any>(null)
  const [activeCategory, setactiveCategory] = useState(0)
  const [isEnabled, setisEnabled] = useState(false)
  const { width, height } = Dimensions.get('window')

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);
  const mapRef = useRef<MapView>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const categories = [
    {
      name: 'all events',
      icon: null,
      iconType: null
    },
    {
      name: 'sports',
      icon: "soccer-ball-o",
      iconType: "font-awesome"
    },
    {
      name: 'movies',
      icon: "movie-open-star-outline",
      iconType: "material-community"
    },
    {
      name: 'Tech',
      icon: "laptop",
      iconType: "foundation"
    }
  ]

  const cameraPosition = {
    coordinates: {
      latitude: 39.129894,
      longitude: -84.516852,
    },
    zoom: 15
  }

  const dummyEvents = [
    {
      "id": "11361570",
      "institutionId": 4412,
      "organizationId": 207055,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Catholic Bearcats at the University of Cincinnati",
      "organizationProfilePicture": "f2beb9f8-5571-4c11-bb5b-bc28c59f780e5aa8ed1d-d24c-4135-8e03-db7aa7a6d5f8.png",
      "organizationNames": [],
      "name": "MEN'S AND WOMEN'S NIGHT AT CATHOLIC BEARCAT",
      "description": "<p>MEN are gathering at Sheakley Lawn</p>\r\n<p>WOMEN are gathering at Bearcat Commons</p>",
      "location": "Bearcat Commons",
      "startsOn": "2025-08-30T22:00:00+00:00",
      "endsOn": "2025-08-31T02:00:00+00:00",
      "imagePath": "d228e69d-117e-48cd-937e-5478b7aa59f1263536aa-46e6-4241-878b-b44af8f51cc5.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132450",
      "longitude": "-84.517390",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.90607
    },
    {
      "id": "11440351",
      "institutionId": 4412,
      "organizationId": 346817,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Chi Alpha Christian Fellowship",
      "organizationProfilePicture": "9b1d16d4-9bd6-4d23-9836-4928d06d34e2da4dad8f-dc40-47f5-bda7-670e1107e631.png",
      "organizationNames": [],
      "name": "Freeze Frame: Ice cream sundaes & DIY picture frames for the girlies",
      "description": "<p><strong data-start=\"73\" data-end=\"158\">Bring your friends for a sweet night of ice cream sundaes and DIY picture frames!</strong> 🎉<br data-start=\"161\" data-end=\"164\" />All you need to bring is your creativity&mdash;we&rsquo;ll have everything ready to design a cute frame and even print a photo for you to put inside. Can&rsquo;t wait to see you there, ladies! ✨</p>",
      "location": "Campus Green",
      "startsOn": "2025-08-30T23:00:00+00:00",
      "endsOn": "2025-08-31T01:00:00+00:00",
      "imagePath": "8632d3a4-7e19-49e4-8a92-75b51fa4e9c08f5a8bc7-7886-43a8-88cb-2c8e07e76258.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.133720",
      "longitude": "-84.513150",
      "recScore": null,
      "rsvpTotal": 19,
      "@search.score": 99.901634
    },
    {
      "id": "11440610",
      "institutionId": 4412,
      "organizationId": 346817,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Chi Alpha Christian Fellowship",
      "organizationProfilePicture": "9b1d16d4-9bd6-4d23-9836-4928d06d34e2da4dad8f-dc40-47f5-bda7-670e1107e631.png",
      "organizationNames": [],
      "name": "Battle of the Bros: Capture the Flag",
      "description": "<p>Grab a friend and join us for Capture the Flag&mdash;strategy, teamwork, and a little friendly competition. This one is just for the guys. Don&rsquo;t miss it!</p>",
      "location": "Campus Green",
      "startsOn": "2025-08-31T00:00:00+00:00",
      "endsOn": "2025-08-31T02:00:00+00:00",
      "imagePath": "e154e683-a73e-43d1-9a77-1b9e6e668782ccfdc424-db15-45d1-8079-a604408b2a37.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Canceled",
      "latitude": "39.133690",
      "longitude": "-84.513270",
      "recScore": null,
      "rsvpTotal": 2,
      "@search.score": 99.89721
    },
    {
      "id": "11361583",
      "institutionId": 4412,
      "organizationId": 207055,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Catholic Bearcats at the University of Cincinnati",
      "organizationProfilePicture": "f2beb9f8-5571-4c11-bb5b-bc28c59f780e5aa8ed1d-d24c-4135-8e03-db7aa7a6d5f8.png",
      "organizationNames": [],
      "name": "SUNDAY MASS",
      "description": "<p>Celebrate the Mass with us!&nbsp;</p>\r\n<p>10AM &amp; 8PM&nbsp;</p>\r\n<p>St. Monica St. George</p>",
      "location": "St. Monica St. George",
      "startsOn": "2025-08-31T14:00:00+00:00",
      "endsOn": "2025-08-31T15:15:00+00:00",
      "imagePath": "cb415054-f0c6-4810-8f6f-eb31516f8d26e1bd397e-0093-4973-8932-a9d9b6dcc068.png",
      "theme": "Spirituality",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.128480",
      "longitude": "-84.524440",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.835175
    },
    {
      "id": "11526128",
      "institutionId": 4412,
      "organizationId": 206944,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Christian Students at UC",
      "organizationProfilePicture": "72813419-8adf-4ceb-9841-3bfa91e19133879d7f6b-43d5-4440-b642-cdaf8b8135d0.png",
      "organizationNames": [],
      "name": "Sunday Fellowship",
      "description": "<p>Join us for our weekly Sunday gathering at 11a with fellow Bearcats and members of the church that supports our campus club! The messages are awesome and applicable to daily life, and they change every few weeks so it's always relevant and fresh!</p>",
      "location": "Stratford Banquet Hall, Building 16",
      "startsOn": "2025-08-31T15:00:00+00:00",
      "endsOn": "2025-08-31T16:00:00+00:00",
      "imagePath": "b135b3bc-f8f1-4ac9-bd73-bf0e462acdbc17d6cf41-4c4d-4011-89d9-2cd331acb3d1.png",
      "theme": "Spirituality",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.83074
    },
    {
      "id": "11361585",
      "institutionId": 4412,
      "organizationId": 207055,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Catholic Bearcats at the University of Cincinnati",
      "organizationProfilePicture": "f2beb9f8-5571-4c11-bb5b-bc28c59f780e5aa8ed1d-d24c-4135-8e03-db7aa7a6d5f8.png",
      "organizationNames": [],
      "name": "SUNDAY MASS",
      "description": "<p>Celebrate the Mass with us!&nbsp;</p>\r\n<p>10AM &amp; 8PM&nbsp;</p>\r\n<p>St. Monica St. George</p>",
      "location": "St. Monica St. George",
      "startsOn": "2025-09-01T00:00:00+00:00",
      "endsOn": "2025-09-01T01:15:00+00:00",
      "imagePath": "cb415054-f0c6-4810-8f6f-eb31516f8d26e1bd397e-0093-4973-8932-a9d9b6dcc068.png",
      "theme": "Spirituality",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.79081
    },
    {
      "id": "11427787",
      "institutionId": 4412,
      "organizationId": 207366,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "BearcatTHON at the University of Cincinnati",
      "organizationProfilePicture": "0b0147d9-fa56-4899-94a9-551f6b528816bd55cb64-0f57-4abb-b74f-373bf46bed7b.PNG",
      "organizationNames": [],
      "name": "BearcatTHON Welcome Party",
      "description": "<p>Join us as we launch another incredible year of BearcatTHON! Come hang out with friends, enjoy <strong data-start=\"215\" data-end=\"234\">free snow cones</strong>, play <strong data-start=\"241\" data-end=\"259\">fun yard games</strong>, and take part in exciting activities. This is your chance to learn more about our mission, discover how BearcatTHON raises life-changing funds for <strong data-start=\"408\" data-end=\"457\" data-is-only-node=\"\">Cincinnati Children&rsquo;s Hospital Medical Center</strong>, and find out how <em data-start=\"476\" data-end=\"481\">you</em> can make an impact. Whether you&rsquo;re here for the fun, the cause, or both &mdash; this is the perfect way to start the year <strong data-start=\"598\" data-end=\"614\">For The Kids</strong>!</p>",
      "location": "Sigma Sigma Commons",
      "startsOn": "2025-09-01T16:00:00+00:00",
      "endsOn": "2025-09-01T19:00:00+00:00",
      "imagePath": "d22ed37b-e189-43b3-8891-08a4424de115fa392601-9065-4628-ba19-2be83d52ee6f.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132920",
      "longitude": "-84.512520",
      "recScore": null,
      "rsvpTotal": 23,
      "@search.score": 99.71973
    },
    {
      "id": "11361601",
      "institutionId": 4412,
      "organizationId": 207055,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Catholic Bearcats at the University of Cincinnati",
      "organizationProfilePicture": "f2beb9f8-5571-4c11-bb5b-bc28c59f780e5aa8ed1d-d24c-4135-8e03-db7aa7a6d5f8.png",
      "organizationNames": [],
      "name": "SOCCER TOURNAMENT ",
      "description": "<p>Catholic Bearcat Co-Ed Soccer Tournament&nbsp;</p>",
      "location": "Sheakley Lawn",
      "startsOn": "2025-09-01T17:00:00+00:00",
      "endsOn": "2025-09-01T21:00:00+00:00",
      "imagePath": "51a66dc1-56e7-432c-bfba-77ca5236fa9fcab3e5d5-2444-46ed-afef-a32f1c9a5ff7.png",
      "theme": "Athletics",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.130860",
      "longitude": "-84.515970",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.71529
    },
    {
      "id": "11457798",
      "institutionId": 4412,
      "organizationId": 207013,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "University of Cincinnati Harry Potter Appreciation Club",
      "organizationProfilePicture": "cceaaede-100e-466a-aa36-33816e2b770c092139fe-74c0-430a-873a-f46f4b407bbd.jpg",
      "organizationNames": [],
      "name": "UCHP weekly club meeting",
      "description": "<p>UC Harry Potter Appreciation Club invites you to join us weekly on Mondays from 7-8pm in Swift Hall 719!</p>\r\n<p>We have discussions on the books and movies, craft nights, and game nights!</p>\r\n<p>We would love to have you join us!</p>\r\n<p>Here is a link to our GroupMe:</p>\r\n<p>https://groupme.com/join_group/21494652/nXGNEk&nbsp;</p>\r\n<p>&nbsp;</p>",
      "location": "Swift Hall 719",
      "startsOn": "2025-09-01T23:00:00+00:00",
      "endsOn": "2025-09-02T00:00:00+00:00",
      "imagePath": "ce1ea791-3cf8-48e1-9a78-481e63c369a9bfb7c47f-7c6a-4fc5-a4b1-82b2da9a9604.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 2,
      "@search.score": 99.68859
    },
    {
      "id": "11507723",
      "institutionId": 4412,
      "organizationId": 388328,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "UC Libraries",
      "organizationProfilePicture": "8095571a-881e-4af6-8421-0efedefe711622b74dca-5927-4345-858c-17dda8069ae2.png",
      "organizationNames": [],
      "name": "Foundations of Python 1 - Variables & Data Types",
      "description": "<p>The Foundations of Python workshop series is a comprehensive three-part Python series that focuses on the basic and intermediate concepts in Python. The workshops are taught using Google Colab, a cloud-based platform to run Python code.&nbsp;</p>\r\n<p>Designed for individuals with little or no technical background, this beginner-friendly workshop introduces the basic building blocks&nbsp;of Python, a widely used and versatile programming language. Participants will learn essential concepts such as variables and different data types - strings, lists, tuples, sets, dictionaries. This workshop will help in getting started with Python.&nbsp;</p>\r\n<p>Please have Google Chrome (preferred) or Mozilla Firefox web browser installed. For supplemental information, see&nbsp;<a href=\"http://guides.libraries.uc.edu/python\">http://guides.libraries.uc.edu/python</a>.&nbsp;</p>",
      "location": "CEAS Library ",
      "startsOn": "2025-09-02T15:00:00+00:00",
      "endsOn": "2025-09-02T16:00:00+00:00",
      "imagePath": "a160ac95-cb52-4695-8b75-8b65334d3ef38574842f-745f-4192-8f71-baf188a72772.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "13058"
      ],
      "categoryNames": [
        "Workshop"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132860",
      "longitude": "-84.516690",
      "recScore": null,
      "rsvpTotal": 5,
      "@search.score": 99.61735
    },
    {
      "id": "11416103",
      "institutionId": 4412,
      "organizationId": 206769,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Student Wellness Center",
      "organizationProfilePicture": "7df58b2f-6d3c-44a8-833b-586eb6e4c25f9417ecf5-b7f3-4eef-8eae-35791d62eeca.jpg",
      "organizationNames": [],
      "name": "Recovery Month Kickoff",
      "description": "<p>Join us in celebrating the start of Recovery Month!</p>\r\n<p>Recovery Month celebrates people who are in recovery from substance use and behavioral addictions.</p>\r\n<p>Stop by our table to learn about recovery, Bearcats Recovery Community, and coping. Show support for students in recovery at UC by leaving some words of encouragement for students in recovery and grab a silent fidget toy and pocket journal!</p>",
      "location": "UC MainStreet",
      "startsOn": "2025-09-02T15:00:00+00:00",
      "endsOn": "2025-09-02T17:00:00+00:00",
      "imagePath": "bd93a98c-eb61-46bc-b3aa-6546d2b42ff9d6eeb9be-b364-4e5e-9a7f-2e3339b063f3.png",
      "theme": "Social",
      "categoryIds": [
        "12991",
        "13060"
      ],
      "categoryNames": [
        "Community Engagement",
        "Health & Wellness"
      ],
      "benefitNames": [
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132180",
      "longitude": "-84.516330",
      "recScore": null,
      "rsvpTotal": 1,
      "@search.score": 99.61735
    },
    {
      "id": "11419577",
      "institutionId": 4412,
      "organizationId": 206769,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Student Wellness Center",
      "organizationProfilePicture": "7df58b2f-6d3c-44a8-833b-586eb6e4c25f9417ecf5-b7f3-4eef-8eae-35791d62eeca.jpg",
      "organizationNames": [],
      "name": "Tea Time Tuesday",
      "description": "<p>Stop by the Student Wellness Center to grab some free tea and snacks</p>",
      "location": "Student Wellness Center",
      "startsOn": "2025-09-02T17:00:00+00:00",
      "endsOn": "2025-09-02T19:00:00+00:00",
      "imagePath": "2f3e5220-35af-4f04-b36a-c6730ea6a6dc57e6112d-028d-4429-ad78-b077aafc2fe1.png",
      "theme": "Social",
      "categoryIds": [
        "10754",
        "13057"
      ],
      "categoryNames": [
        "Department or Office ",
        "Program"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 7,
      "@search.score": 99.60843
    },
    {
      "id": "11380600",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [
        "201310",
        "391406"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593"
      ],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [
        "Bearcats Welcome",
        "The Bearcat Promise Career Studio"
      ],
      "name": "Part Time Job Fair",
      "description": "<p>This in-person fair is for UC students in all majors and school years who are looking for paid, part-time work on campus and in the local area. Job opportunities include restaurant, retail, office, warehouse, marketing, tutoring and the like.</p>",
      "location": "TUC Great Hall, TUC 400A, TUC400B, TUC400C",
      "startsOn": "2025-09-02T17:00:00+00:00",
      "endsOn": "2025-09-02T20:00:00+00:00",
      "imagePath": "9cd045c4-2eab-49f7-8a43-b342ae28feb848090304-1335-450d-a0dd-6374a1af90f2.png",
      "theme": "GroupBusiness",
      "categoryIds": [
        "13061"
      ],
      "categoryNames": [
        "Career Readiness"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 56,
      "@search.score": 99.60843
    },
    {
      "id": "11489585",
      "institutionId": 4412,
      "organizationId": 207056,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "CRU",
      "organizationProfilePicture": "e5815756-0a66-423d-9ddc-2ee5b6773ea02dc9e67f-725b-4e95-846f-573a2493ac94.jpg",
      "organizationNames": [],
      "name": "Men's Tuesday Night Bible Study",
      "description": "<p>A gathering to grow in community, learn about Jesus, and meet new friends!</p>",
      "location": "Lindner Hall 1120",
      "startsOn": "2025-09-02T21:00:00+00:00",
      "endsOn": "2025-09-02T23:00:00+00:00",
      "imagePath": "08da2e5b-e1c3-4074-9663-fa101646e17c545849a0-9f1b-4d99-b6a7-80eb4a8d715f.png",
      "theme": "Spirituality",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 1,
      "@search.score": 99.5906
    },
    {
      "id": "11514057",
      "institutionId": 4412,
      "organizationId": 239131,
      "organizationIds": [],
      "branchId": 200592,
      "branchIds": [],
      "organizationName": "Queen City Consulting",
      "organizationProfilePicture": "414f9a8f-d079-4a01-8957-a384daf336de188fd50c-0ab0-4459-b479-cd78c6ae8742.PNG",
      "organizationNames": [],
      "name": "Queen City Consulting | Active Member Panel",
      "description": "<p>Join Queen City Consulting's Active Member Panel on <strong>September 2nd from 5:00-6:00 in Lindner 2250</strong>. We will have a few members talk about their experience in QCC and how they've gotten in the consulting industry. Come with questions on the QCC experience to ask!</p>\r\n<p>For more information on QCC, <a href=\"https://linktr.ee/queencityconsulting\">check out this link</a>. Here you'll find our application link and the recruitment schedule. We are requiring all applicants to attend one recruitment event in the evening.</p>",
      "location": "Lindner 2250",
      "startsOn": "2025-09-02T21:00:00+00:00",
      "endsOn": "2025-09-02T22:00:00+00:00",
      "imagePath": "06ac0037-76eb-41da-ba50-f11196ff7d26833e3886-6ad0-4a4a-b581-70df6979d867.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.5906
    },
    {
      "id": "11516508",
      "institutionId": 4412,
      "organizationId": 207323,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "University of Cincinnati Amateur Radio Club",
      "organizationProfilePicture": "1b18498b-e5a1-403e-aadc-78c039d24155f96e12eb-3e3e-4d10-9cde-3b74d1838e43.png",
      "organizationNames": [],
      "name": "UC Amateur Radio Club - Operation Meeting",
      "description": "<p>At this meeting we'll be operating out of the club room. We'll be trying to make contacts and learning about how to use a radio.</p>",
      "location": "French Hall Room 6409",
      "startsOn": "2025-09-02T21:00:00+00:00",
      "endsOn": "2025-09-02T22:00:00+00:00",
      "imagePath": "4b194b11-da34-4968-a4fe-e61b1869077ecafaf126-9604-4975-a108-a5c1df7f9272.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.5906
    },
    {
      "id": "11466162",
      "institutionId": 4412,
      "organizationId": 207002,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "American Medical Student Association - Premedical Chapter",
      "organizationProfilePicture": "7f4377c8-5d15-43c3-bac5-a9dc0f0ff2b08b9925b1-6316-4402-8243-7b617132f26f.png",
      "organizationNames": [],
      "name": "Introductory Meeting",
      "description": "<p>Come get to know AMSA and its exec members over some Chipotle! We look forward to meeting you all and hearing your input.</p>",
      "location": "Lindner Hall Room 3115",
      "startsOn": "2025-09-02T21:00:00+00:00",
      "endsOn": "2025-09-02T22:30:00+00:00",
      "imagePath": null,
      "theme": "Social",
      "categoryIds": [
        "13951"
      ],
      "categoryNames": [
        "Peer to Peer Program"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.133960",
      "longitude": "-84.514380",
      "recScore": null,
      "rsvpTotal": 12,
      "@search.score": 99.5906
    },
    {
      "id": "11507684",
      "institutionId": 4412,
      "organizationId": 207086,
      "organizationIds": [],
      "branchId": 200594,
      "branchIds": [],
      "organizationName": "Phi Sigma Rho",
      "organizationProfilePicture": "485cbf83-b0b2-47c9-9b59-d9a7841ffb864f362ff4-146a-434c-aaf7-70e0f45802fd.PNG",
      "organizationNames": [],
      "name": "Pre-Chapter Study Tables",
      "description": "<p>Active members dedicate time before the chapter meeting to study for their classes together.</p>",
      "location": "CRC 3220",
      "startsOn": "2025-09-02T21:30:00+00:00",
      "endsOn": "2025-09-02T22:30:00+00:00",
      "imagePath": null,
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "20023"
      ],
      "categoryNames": [
        "FSL GAP Academics"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132090",
      "longitude": "-84.514830",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.58836
    },
    {
      "id": "11499159",
      "institutionId": 4412,
      "organizationId": 207141,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Minority Association of Pre-Medical Students",
      "organizationProfilePicture": "cc1b73b0-acf6-4f31-90cb-0564a2109a96828b1f68-a956-4056-b08c-97a0a9897fe9.png",
      "organizationNames": [],
      "name": "Medical Scavenger Hunt",
      "description": "<p>&nbsp;</p>\r\n<p data-start=\"49\" data-end=\"206\">✨ Join MAPS for our <strong data-start=\"69\" data-end=\"102\">first meeting of the semester.</strong>&nbsp;A <strong data-start=\"107\" data-end=\"133\">Medical Scavenger Hunt</strong>! 🩺🧩<br data-start=\"139\" data-end=\"142\" />📅 Tuesday, September 2nd<br data-start=\"167\" data-end=\"170\" />🕕 6:00&ndash;7:30 PM<br data-start=\"185\" data-end=\"188\" />📍 CRC Room 3200</p>\r\n<p data-start=\"208\" data-end=\"324\">Come out for a fun, interactive night to kick off the semester. Don&rsquo;t miss it! 🚀<br data-start=\"289\" data-end=\"292\" />For more info, follow us&nbsp;<strong data-start=\"310\" data-end=\"322\">@UC_MAPS</strong></p>",
      "location": "CRC Room 3200",
      "startsOn": "2025-09-02T22:00:00+00:00",
      "endsOn": "2025-09-02T23:30:00+00:00",
      "imagePath": "2f4db926-cadc-4e51-8448-c75a518897ea4359c1c2-f9a0-4043-ad07-d7be2869d1e0.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.586136
    },
    {
      "id": "11499160",
      "institutionId": 4412,
      "organizationId": 207141,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Minority Association of Pre-Medical Students",
      "organizationProfilePicture": "cc1b73b0-acf6-4f31-90cb-0564a2109a96828b1f68-a956-4056-b08c-97a0a9897fe9.png",
      "organizationNames": [],
      "name": "Medical Scavenger Hunt",
      "description": "<p>&nbsp;</p>\r\n<p data-start=\"49\" data-end=\"206\">✨ Join MAPS for our <strong data-start=\"69\" data-end=\"102\">first meeting of the semester.</strong>&nbsp;A <strong data-start=\"107\" data-end=\"133\">Medical Scavenger Hunt</strong>! 🩺🧩<br data-start=\"139\" data-end=\"142\" />📅 Tuesday, September 2nd<br data-start=\"167\" data-end=\"170\" />🕕 6:00&ndash;7:30 PM<br data-start=\"185\" data-end=\"188\" />📍 CRC Room 3200</p>\r\n<p data-start=\"208\" data-end=\"324\">Come out for a fun, interactive night to kick off the semester. Don&rsquo;t miss it! 🚀<br data-start=\"289\" data-end=\"292\" />For more info, follow us&nbsp;<strong data-start=\"310\" data-end=\"322\">@UC_MAPS</strong></p>",
      "location": "CRC Room 3200",
      "startsOn": "2025-09-02T22:00:00+00:00",
      "endsOn": "2025-09-02T23:30:00+00:00",
      "imagePath": "2f4db926-cadc-4e51-8448-c75a518897ea4359c1c2-f9a0-4043-ad07-d7be2869d1e0.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.586136
    },
    {
      "id": "11499158",
      "institutionId": 4412,
      "organizationId": 207141,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Minority Association of Pre-Medical Students",
      "organizationProfilePicture": "cc1b73b0-acf6-4f31-90cb-0564a2109a96828b1f68-a956-4056-b08c-97a0a9897fe9.png",
      "organizationNames": [],
      "name": "Medical Scavenger Hunt",
      "description": "<p>&nbsp;</p>\r\n<p data-start=\"49\" data-end=\"206\">✨ Join MAPS for our <strong data-start=\"69\" data-end=\"102\">first meeting of the semester.</strong>&nbsp;A <strong data-start=\"107\" data-end=\"133\">Medical Scavenger Hunt</strong>! 🩺🧩<br data-start=\"139\" data-end=\"142\" />📅 Tuesday, September 2nd<br data-start=\"167\" data-end=\"170\" />🕕 6:00&ndash;7:30 PM<br data-start=\"185\" data-end=\"188\" />📍 CRC Room 3200</p>\r\n<p data-start=\"208\" data-end=\"324\">Come out for a fun, interactive night to kick off the semester. Don&rsquo;t miss it! 🚀<br data-start=\"289\" data-end=\"292\" />For more info, follow us&nbsp;<strong data-start=\"310\" data-end=\"322\">@UC_MAPS</strong></p>",
      "location": "CRC Room 3200",
      "startsOn": "2025-09-02T22:00:00+00:00",
      "endsOn": "2025-09-02T23:30:00+00:00",
      "imagePath": "2f4db926-cadc-4e51-8448-c75a518897ea4359c1c2-f9a0-4043-ad07-d7be2869d1e0.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.586136
    },
    {
      "id": "11499157",
      "institutionId": 4412,
      "organizationId": 207141,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Minority Association of Pre-Medical Students",
      "organizationProfilePicture": "cc1b73b0-acf6-4f31-90cb-0564a2109a96828b1f68-a956-4056-b08c-97a0a9897fe9.png",
      "organizationNames": [],
      "name": "Medical Scavenger Hunt",
      "description": "<p>&nbsp;</p>\r\n<p data-start=\"49\" data-end=\"206\">✨ Join MAPS for our <strong data-start=\"69\" data-end=\"102\">first meeting of the semester.</strong>&nbsp;A <strong data-start=\"107\" data-end=\"133\">Medical Scavenger Hunt</strong>! 🩺🧩<br data-start=\"139\" data-end=\"142\" />📅 Tuesday, September 2nd<br data-start=\"167\" data-end=\"170\" />🕕 6:00&ndash;7:30 PM<br data-start=\"185\" data-end=\"188\" />📍 CRC Room 3200</p>\r\n<p data-start=\"208\" data-end=\"324\">Come out for a fun, interactive night to kick off the semester. Don&rsquo;t miss it! 🚀<br data-start=\"289\" data-end=\"292\" />For more info, follow us&nbsp;<strong data-start=\"310\" data-end=\"322\">@UC_MAPS</strong></p>",
      "location": "CRC Room 3200",
      "startsOn": "2025-09-02T22:00:00+00:00",
      "endsOn": "2025-09-02T23:30:00+00:00",
      "imagePath": "2f4db926-cadc-4e51-8448-c75a518897ea4359c1c2-f9a0-4043-ad07-d7be2869d1e0.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132090",
      "longitude": "-84.514830",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.586136
    },
    {
      "id": "11374479",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [
        "201310",
        "207123"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593",
        "200594"
      ],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [
        "Bearcats Welcome",
        "FSL Admin"
      ],
      "name": "NPHC Declassified",
      "description": "<p>Declassified is the National Pan-Hellenic Councils bi-annual program for prospective new members. This program is to allow incoming and current students to meeting the current members of NPHC, learn the specific membership requirements for each respective chapter, and answer any questions that students might have. This signature event is a requirement for students wishing to join a NPHC chapter.</p>",
      "location": "TUC 465 (Great Hall) & TUC 499 (4th Floor Lobby)",
      "startsOn": "2025-09-02T22:00:00+00:00",
      "endsOn": "2025-09-03T00:00:00+00:00",
      "imagePath": "ba90b277-7a9d-4229-9ff2-c5cf652106a59e7167a8-4a72-4337-8505-9270d25a64d7.png",
      "theme": "Social",
      "categoryIds": [
        "9878"
      ],
      "categoryNames": [
        "Fraternity & Sorority Life "
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Canceled",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.586136
    },
    {
      "id": "11517820",
      "institutionId": 4412,
      "organizationId": 225083,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "UC Students for Life",
      "organizationProfilePicture": "e8b745f0-65c2-45fa-88b8-837a7949a202a6456c1d-53fa-497e-9e37-7f51cbef068b.JPG",
      "organizationNames": [],
      "name": "Pro-Life Apologetics Training ",
      "description": "<p>Guest speaker Nicholas Cech</p>",
      "location": "TUC 415",
      "startsOn": "2025-09-02T22:00:00+00:00",
      "endsOn": "2025-09-02T23:00:00+00:00",
      "imagePath": null,
      "theme": "ThoughtfulLearning",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "36.158680",
      "longitude": "-86.815130",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.586136
    },
    {
      "id": "11295207",
      "institutionId": 4412,
      "organizationId": 370195,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Ratio Christi at the University of Cincinnati",
      "organizationProfilePicture": "977892e5-8656-4ad7-9405-a226347d98be15cb69b4-a206-4f31-8cdf-f733f8af68f1.png",
      "organizationNames": [],
      "name": "Ratio Christi Weekly Meeting",
      "description": "<p>We will meet to discuss a topic around Christian apologetics. This meeting will involve some kind of lecture and lots of healthy debate.</p>",
      "location": "University of Cincinnati",
      "startsOn": "2025-09-02T22:30:00+00:00",
      "endsOn": "2025-09-03T00:30:00+00:00",
      "imagePath": "05ff44d8-f3de-412b-81a7-35f2b39f87cba2b21c55-486c-4e5e-a382-0fafa357436c.png",
      "theme": "Spirituality",
      "categoryIds": [
        "10167"
      ],
      "categoryNames": [
        "Cultural Event"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.58391
    },
    {
      "id": "11429215",
      "institutionId": 4412,
      "organizationId": 207242,
      "organizationIds": [],
      "branchId": 200594,
      "branchIds": [],
      "organizationName": "National Pan-Hellenic Council",
      "organizationProfilePicture": "fb311b81-7405-4e53-a08a-730e945029c6cb2b7f2e-c3a3-48a7-8625-3ffbae3d731f.png",
      "organizationNames": [],
      "name": "Declassified 2025",
      "description": "<p>Come learn about all the organizations in the National Pan-Hellenic Council and meet the Greeks that are on the yard! Attendance is required in order to become a member of an NPHC organization.&nbsp;</p>",
      "location": "TUC: Great Hall",
      "startsOn": "2025-09-02T22:30:00+00:00",
      "endsOn": "2025-09-03T00:00:00+00:00",
      "imagePath": "882a3f8c-35ef-43d8-be10-483d8064837d42a00bef-d039-4f1c-aca3-323f3e63fc26.png",
      "theme": "Cultural",
      "categoryIds": [
        "9879"
      ],
      "categoryNames": [
        "Campus Event"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132110",
      "longitude": "-84.514350",
      "recScore": null,
      "rsvpTotal": 167,
      "@search.score": 99.58391
    },
    {
      "id": "11515919",
      "institutionId": 4412,
      "organizationId": 207087,
      "organizationIds": [],
      "branchId": 200594,
      "branchIds": [],
      "organizationName": "Delta Phi Lambda Sorority, Inc.",
      "organizationProfilePicture": "80962d8e-6961-400d-a2f2-c6c798073663dcde67f6-098d-4343-8956-93c83d78fee8.jpg",
      "organizationNames": [],
      "name": "Pipe Cleaner Petals",
      "description": "<p>Delta Phi Lambda Sorority, Inc.'s first recruitment event for the Fall 2025 semester. Get to know the Sxsters and create beautiful pipe cleaner flowers.&nbsp;</p>",
      "location": "Swift 819",
      "startsOn": "2025-09-02T22:30:00+00:00",
      "endsOn": "2025-09-03T00:00:00+00:00",
      "imagePath": "757dc77c-fc84-4821-bee5-9807777c9e9dee9560b4-9a36-4832-a4a0-a5b5451c5cc2.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132450",
      "longitude": "-84.517390",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.58391
    },
    {
      "id": "11511138",
      "institutionId": 4412,
      "organizationId": 206764,
      "organizationIds": [],
      "branchId": 200592,
      "branchIds": [],
      "organizationName": "Bearcats Baja Racing Club",
      "organizationProfilePicture": "3855d951-bd31-47c6-ab77-6dcfdcc2e55b33aacac9-8f28-4a70-8441-063c1e7ffcdc.jpg",
      "organizationNames": [],
      "name": "Drivetrain Sub-Team Weekly Meeting",
      "description": "<p>This will serve as the standing weekly time for the Baja Drivetrain subteam to meet. All students are invited, regardless of academic level!</p>",
      "location": "Victory Parkway Campus Room 309",
      "startsOn": "2025-09-02T23:00:00+00:00",
      "endsOn": "2025-09-03T00:00:00+00:00",
      "imagePath": "4810bf9b-9ec0-4d59-9ea5-402d828b8dcb933abe49-ca90-4dce-83ca-a9921a559d93.png",
      "theme": "GroupBusiness",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.121110",
      "longitude": "-84.484440",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.58167
    },
    {
      "id": "11383380",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [],
      "name": "Bearcat's Welcome Trivia",
      "description": "<p>Students can join one of three sessions for a chance to learn more about their surroundings, have fun with one another, and win fun prizes!</p>",
      "location": "Catskeller",
      "startsOn": "2025-09-02T23:00:00+00:00",
      "endsOn": "2025-09-03T01:00:00+00:00",
      "imagePath": "04034db6-f5c1-4d8e-bdfe-c156fa2d505d73543331-ae30-4daa-b86c-5f33154d07a3.png",
      "theme": "Social",
      "categoryIds": [
        "9879"
      ],
      "categoryNames": [
        "Campus Event"
      ],
      "benefitNames": [
        "Free Food",
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 4,
      "@search.score": 99.58167
    },
    {
      "id": "11489765",
      "institutionId": 4412,
      "organizationId": 207056,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "CRU",
      "organizationProfilePicture": "e5815756-0a66-423d-9ddc-2ee5b6773ea02dc9e67f-725b-4e95-846f-573a2493ac94.jpg",
      "organizationNames": [],
      "name": "Women's Tuesday Night Bible Study",
      "description": "<p>A gathering to grow in community, learn about Jesus, and meet new friends!</p>",
      "location": "Baldwin 648",
      "startsOn": "2025-09-02T23:30:00+00:00",
      "endsOn": "2025-09-03T00:30:00+00:00",
      "imagePath": "2cb8671d-07f2-4687-8134-9d1bc89480fece876f12-e071-4b7c-b112-5dddda8f81c0.png",
      "theme": "Spirituality",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 2,
      "@search.score": 99.579445
    },
    {
      "id": "11166428",
      "institutionId": 4412,
      "organizationId": 206828,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Fine Arts Association",
      "organizationProfilePicture": "8583037a-198d-4218-aeb6-7e80010aefcdec66faf2-38a0-4ea3-bd2e-504f73135f00.png",
      "organizationNames": [],
      "name": "Fine Arts Association Annual New York Trip Fall 2025",
      "description": "<div>\r\n<div class=\"DescriptionText\">\r\n<p>The Fine Arts Association leads an annual trip to New York that is intended to enrich the practice of students studying fine arts, as well as others at UC. The trip is designed to coincide with the Armory Show, which is one of the largest art fairs in the world. It's also Fall Fashion Week. We have many students from the School of Art, but also from across DAAP and from other colleges. Students attending the trip will network with local New York artists, become drenched in the country's most eminent art museum collections, and have fun experiencing the culture at the center point of contemporary art in the United States. The School of Art announces signup (including itinerary and cost) in February, and the signup process will conclude by the end of spring semester. Cost for the trip includes Croswell bus transportation to and from New York, four nights in a boutique hotel, and a ticket to the Armory Show.&nbsp;</p>\r\n</div>\r\n</div>\r\n<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "location": "New York, NY",
      "startsOn": "2025-09-03T12:00:00+00:00",
      "endsOn": "2025-09-08T01:00:00+00:00",
      "imagePath": "fa6150cf-106c-4962-bf3c-b9a2e2d6ab085dbbdf08-14cd-4ed4-a692-2ccd810c8be3.png",
      "theme": "Arts",
      "categoryIds": [
        "10167",
        "10168",
        "13061"
      ],
      "categoryNames": [
        "Cultural Event",
        "Conference & Educational Events",
        "Career Readiness"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.52365
    },
    {
      "id": "11383475",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [],
      "name": "East Campus Donuts and Coffee Truck",
      "description": "<p>COM students can come enjoy refreshments following College Day programming!</p>",
      "location": "Eden Ave (Right by COM) ",
      "startsOn": "2025-09-03T13:00:00+00:00",
      "endsOn": "2025-09-03T16:00:00+00:00",
      "imagePath": "669ac0d0-c6de-46d6-99a4-852d48ff78a09b406abb-a9f2-4439-bea1-01ed0279aad4.png",
      "theme": "Social",
      "categoryIds": [
        "9879"
      ],
      "categoryNames": [
        "Campus Event"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 4,
      "@search.score": 99.51918
    },
    {
      "id": "11508016",
      "institutionId": 4412,
      "organizationId": 388328,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "UC Libraries",
      "organizationProfilePicture": "8095571a-881e-4af6-8421-0efedefe711622b74dca-5927-4345-858c-17dda8069ae2.png",
      "organizationNames": [],
      "name": "Foundations Of Python 2: Control Flow & Functions ",
      "description": "<p>A follow-up workshop that is&nbsp;built upon the topics covered in the Foundations of Python 1. In this workshop, participants&nbsp;will learn about control flow, loops, and functions. These important concepts will provide&nbsp;a solid foundation for learning more advanced topics in Python.&nbsp;</p>\r\n<p>Please have Google Chrome (preferred) or Mozilla Firefox web browser installed. For supplemental information, see&nbsp;<a href=\"http://guides.libraries.uc.edu/python\">http://guides.libraries.uc.edu/python</a>.&nbsp;</p>",
      "location": "CEAS Library Classroom 850D",
      "startsOn": "2025-09-03T14:00:00+00:00",
      "endsOn": "2025-09-03T16:00:00+00:00",
      "imagePath": "61027a2a-9176-4847-b790-342d15b3fa5ae0e7d4f8-2e63-4591-8c43-319e7dd631d9.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "13058"
      ],
      "categoryNames": [
        "Workshop"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132860",
      "longitude": "-84.516690",
      "recScore": null,
      "rsvpTotal": 3,
      "@search.score": 99.51472
    },
    {
      "id": "11419630",
      "institutionId": 4412,
      "organizationId": 206769,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Student Wellness Center",
      "organizationProfilePicture": "7df58b2f-6d3c-44a8-833b-586eb6e4c25f9417ecf5-b7f3-4eef-8eae-35791d62eeca.jpg",
      "organizationNames": [],
      "name": "Sensory Friendly Hours",
      "description": "<p>During this time the SWC will be quiet with dim lights and fidgets will be available. It is a chance to find solace away from the noise of campus.&nbsp;</p>",
      "location": "Student Wellness Center",
      "startsOn": "2025-09-03T14:00:00+00:00",
      "endsOn": "2025-09-03T16:00:00+00:00",
      "imagePath": "9aa7b786-2634-4f32-813e-08036f21f50a99f66dd0-e346-4343-8b6d-1817fe39cfb6.png",
      "theme": "Social",
      "categoryIds": [
        "13057"
      ],
      "categoryNames": [
        "Program"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.51472
    },
    {
      "id": "11378844",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [],
      "name": "513 Culinary Group Series - Taste of 513",
      "description": "<p>Explore top picks from out dining locations &ndash;<em> while supplies last</em>. Enjoy yard games, inflatables &amp; music from DJ Jeffy J.</p>",
      "location": "Campus Green",
      "startsOn": "2025-09-03T15:00:00+00:00",
      "endsOn": "2025-09-03T18:00:00+00:00",
      "imagePath": "d0194bb9-b35d-4f92-8537-c7719b4736316dd06533-9b66-403d-9e16-a56261e42b66.png",
      "theme": "Social",
      "categoryIds": [
        "10754"
      ],
      "categoryNames": [
        "Department or Office "
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 4,
      "@search.score": 99.51025
    },
    {
      "id": "11380605",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [
        "201310",
        "206757",
        "207418"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593",
        "169800"
      ],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [
        "Bearcats Welcome",
        "Center for Student Involvement",
        "Student Government"
      ],
      "name": "Off-Campus Housing Fair",
      "description": "<p>Come find where you want to live next year! Undergraduate Student Government is hosting this year's Off-Campus Housing Fair. Numerous leasing agencies and organizations will be present to showcase the properties they have available currently, and upcoming.</p>",
      "location": "Bearcat Commons",
      "startsOn": "2025-09-03T15:00:00+00:00",
      "endsOn": "2025-09-03T18:00:00+00:00",
      "imagePath": "c1013014-c9ed-4ce6-baee-7d1799a155fb996e923a-bab2-4659-8646-8971f78f6dde.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "12991"
      ],
      "categoryNames": [
        "Community Engagement"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 7,
      "@search.score": 99.51025
    },
    {
      "id": "11368134",
      "institutionId": 4412,
      "organizationId": 321008,
      "organizationIds": [],
      "branchId": 238965,
      "branchIds": [],
      "organizationName": "UC Clermont College Library",
      "organizationProfilePicture": "b7c4fd37-3d60-4635-8fde-39d7717d8f13762c291f-3f8e-483e-805f-b2a7ac2f7339.jpg",
      "organizationNames": [],
      "name": "OneSearch Drop In Session",
      "description": "<p>With the new library services platform and search interface, there have been changes to the current Library Catalog (Books tab) and Summon (single search box). The Marcotte Library at Clermont invite faculty to our August drop in sessions. These sessions are perfect for individual assistance/questions or just to learn about the new library platform and search interface.</p>",
      "location": "CC Marcotte Library",
      "startsOn": "2025-09-03T16:00:00+00:00",
      "endsOn": "2025-09-03T18:00:00+00:00",
      "imagePath": "650866e8-1842-4155-9301-6e56da042bd2bb860670-4e71-4205-997c-54b4bb12aa31.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.50578
    },
    {
      "id": "11410244",
      "institutionId": 4412,
      "organizationId": 365493,
      "organizationIds": [
        "365493",
        "388328"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593"
      ],
      "organizationName": "The Graduate College",
      "organizationProfilePicture": "7f377d4a-cf75-44e2-8f90-cfa475f6281159f7d591-b69f-4049-b040-64b0e0c1fcac.png",
      "organizationNames": [
        "The Graduate College",
        "UC Libraries"
      ],
      "name": "Intro to ORCID Workshop",
      "description": "<p>Join us or this brief virtual session to learn about ORCID.</p>\r\n<p>ORCID is a free, unique, persistent identifier (PID) for individuals to use as they engage in research, scholarship and innovation activities.&nbsp;</p>\r\n<p>This workshop will be led by Amy Koshoffer. Amy Koshoffer is the Assistant Director of Research and Data Services at the University of Cincinnati Libraries. She supports data management and sharing, open science, data literacy, and research reproducibility initiatives as part of the UC Libraries Research and Data Services unit. She is involved in developing research data services, educational opportunities for data management, data sharing and preservation, data analysis such as GIS and spreadsheet best practices, researcher impact and collaborative research workflows.</p>",
      "location": "Online",
      "startsOn": "2025-09-03T16:00:00+00:00",
      "endsOn": "2025-09-03T16:30:00+00:00",
      "imagePath": "bf796c01-217b-44fa-b9e0-2398f1ce97c1a5a6968c-bce9-4141-b5ad-789168041760.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "10754",
        "13058"
      ],
      "categoryNames": [
        "Department or Office ",
        "Workshop"
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 19,
      "@search.score": 99.50578
    },
    {
      "id": "11442979",
      "institutionId": 4412,
      "organizationId": 206965,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Advanced Medical Imaging Technology (AMIT) Student Organization",
      "organizationProfilePicture": "bb1c2f45-13c3-4b3b-8b9a-7e6d825937ef32791e1c-3e64-49bc-bbcd-8a46e60d23da.jpg",
      "organizationNames": [],
      "name": "Monthly Meeting",
      "description": "<p>General Body Meeting</p>",
      "location": "HSB Room G01",
      "startsOn": "2025-09-03T16:00:00+00:00",
      "endsOn": "2025-09-03T17:00:00+00:00",
      "imagePath": null,
      "theme": "GroupBusiness",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.138790",
      "longitude": "-84.505380",
      "recScore": null,
      "rsvpTotal": 8,
      "@search.score": 99.50578
    },
    {
      "id": "11456797",
      "institutionId": 4412,
      "organizationId": 319614,
      "organizationIds": [
        "319614",
        "323848"
      ],
      "branchId": 319614,
      "branchIds": [
        "319614"
      ],
      "organizationName": "UC Blue Ash Student Engagement",
      "organizationProfilePicture": "5390a0bc-1b98-4b0e-a7d4-94854b71ea425be560fd-4462-4160-bebb-a37a7448ef1d.png",
      "organizationNames": [
        "UC Blue Ash Student Engagement",
        " UC Blue Ash Career Services Office"
      ],
      "name": "Introduction to SLPDI (Student Leadership and Professional Development Institute)",
      "description": "<p>The Student Leadership and Professional Development Institute (SLPDI) is a series of nine free workshops open to all UC Blue Ash students.</p>\r\n<p>&nbsp;</p>\r\n<p>SLPDI is an opportunity to build your professional and leadership skills and develop a sense of community at UC Blue Ash.</p>\r\n<p>&nbsp;</p>\r\n<p>Active participants in SLPDI will:</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>Create personal definitions of individual and organizational leadership. Participants will also be able to identify their leadership strengths and areas for future growth.</li>\r\n</ul>\r\n<ul>\r\n<li>Explore the concept of critical thinking and how it relates to being an effective leader.</li>\r\n</ul>\r\n<ul>\r\n<li>Reflect on how to communicate effectively, resolve conflicts, and deal with controversial topics.</li>\r\n</ul>\r\n<ul>\r\n<li>Leave with a professional resume that can catch a hiring manager&rsquo;s attention after passing through applicant-tracking filters.</li>\r\n</ul>\r\n<ul>\r\n<li>Develop the interviewing skills needed to impress potential employers and land a position.</li>\r\n</ul>\r\n<ul>\r\n<li>Establish a professional presence both online and through networking best practices.</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p>Attend the first session to learn more about the topics and the requirements of the institute.</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>",
      "location": "UC Blue Ash - 339 Muntz Hall",
      "startsOn": "2025-09-03T16:20:00+00:00",
      "endsOn": "2025-09-03T17:15:00+00:00",
      "imagePath": "e63a913e-4320-4b25-a92a-40fd4027c22a8c26472f-1556-4d79-ba55-101152f63d8a.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "12461",
        "13061",
        "23632"
      ],
      "categoryNames": [
        "Leadership Development",
        "Career Readiness",
        "UCBA SLPDI"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.232960",
      "longitude": "-84.399720",
      "recScore": null,
      "rsvpTotal": 5,
      "@search.score": 99.50429
    },
    {
      "id": "11511957",
      "institutionId": 4412,
      "organizationId": 360409,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "University Honors Program",
      "organizationProfilePicture": "2242e0f4-57b2-44e2-bcbd-2f70d88130f2e70ebae9-6036-4387-834d-50dd60ed74d3.png",
      "organizationNames": [],
      "name": "UHPiqued | Spring 2026 Study Tour Panel",
      "description": "<p>Dream of studying abroad? Get the inside scoop on Spring 2026 opportunities and start planning your adventure. Limited spots available - don't miss your chance to explore the world as an honors student.</p>",
      "location": "Swift 708",
      "startsOn": "2025-09-03T16:30:00+00:00",
      "endsOn": "2025-09-03T17:30:00+00:00",
      "imagePath": "ad01aa5d-fcea-4e7d-9340-23d9bc166840727a9e1a-a03e-466a-a300-59af01413531.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 7,
      "@search.score": 99.50355
    },
    {
      "id": "11386787",
      "institutionId": 4412,
      "organizationId": 206769,
      "organizationIds": [
        "206769",
        "206797"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593"
      ],
      "organizationName": "Student Wellness Center",
      "organizationProfilePicture": "7df58b2f-6d3c-44a8-833b-586eb6e4c25f9417ecf5-b7f3-4eef-8eae-35791d62eeca.jpg",
      "organizationNames": [
        "Student Wellness Center",
        "Division of Student Affairs"
      ],
      "name": "Gotcha Covered! Training ",
      "description": "<p>Join this one time, one-hour training program to become a certified Gotcha Covered! volunteer! The goal of this program is to increase the accessibility of sexual health products and information in the campus community.</p>\r\n<p>As a result of this training, students will be given a supply of condoms, lube, and sexual health information to distribute to their peers. Great for RAs, campus leaders, and any student who is passionate about health and wellness on campus.&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>Can't attend one of the training dates listed? Request this training for any group of 5 or more students at your convenience through our Presentation Request Form!&nbsp;</p>",
      "location": "Student Wellness Center",
      "startsOn": "2025-09-03T18:30:00+00:00",
      "endsOn": "2025-09-03T19:30:00+00:00",
      "imagePath": "bc0cfbe3-245b-4d17-b262-cd852d44004d6a6b9f60-ceb4-4d01-a113-a9c8ea1bfb56.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "10754",
        "13057",
        "13059",
        "13060",
        "13951"
      ],
      "categoryNames": [
        "Department or Office ",
        "Program",
        "Training",
        "Health & Wellness",
        "Peer to Peer Program"
      ],
      "benefitNames": [
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.132280",
      "longitude": "-84.516460",
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.494606
    },
    {
      "id": "11387196",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [],
      "branchId": 200593,
      "branchIds": [],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [],
      "name": "Popsicles with the Learning Commons",
      "description": "<p>We will be passing out popsicles in French Hall West lobby (close to Learning Commons front desk) to promote the Learning Commons. Attendees can expect to receive a free popsicle and a \"coupon\" for a Learning Commons service (tutoring, academic coaching, academic writing support, and MASS center).</p>",
      "location": "French Hall West Lobby",
      "startsOn": "2025-09-03T18:30:00+00:00",
      "endsOn": "2025-09-03T20:30:00+00:00",
      "imagePath": "f58aa522-8248-4038-8e77-669aba14f5e3edbf4b1e-2eff-4e43-a94a-82e7718910e7.png",
      "theme": "Social",
      "categoryIds": [
        "9879"
      ],
      "categoryNames": [
        "Campus Event"
      ],
      "benefitNames": [
        "Free Food",
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 3,
      "@search.score": 99.494606
    },
    {
      "id": "11495688",
      "institutionId": 4412,
      "organizationId": 206796,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "The Criminal Justice Society at the University of Cincinnati",
      "organizationProfilePicture": "da9f1158-3cf7-4993-90ce-8ff49e46af8315194539-c11f-4e51-83da-5bf84ba45864.png",
      "organizationNames": [],
      "name": "FBI: Info Session",
      "description": "<p data-start=\"123\" data-end=\"335\">Join us for an exciting opportunity to learn more about career paths with the Federal Bureau of Investigation. Representatives from the FBI will be on campus to share their work, answer questions, and talk about internships and career opportunities. This is a great networking opportunity for students interested in criminal justice, law enforcement, or federal service. Pizza will be provided.</p>",
      "location": "TDC 633",
      "startsOn": "2025-09-03T19:00:00+00:00",
      "endsOn": "2025-09-03T20:00:00+00:00",
      "imagePath": "5640cdee-b011-4319-b96c-9eec703dbd2dda195761-0170-4e44-a7a5-bcd7b452e526.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "12798"
      ],
      "categoryNames": [
        "Speaker"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.079560",
      "longitude": "-84.383690",
      "recScore": null,
      "rsvpTotal": 41,
      "@search.score": 99.49237
    },
    {
      "id": "11378956",
      "institutionId": 4412,
      "organizationId": 201310,
      "organizationIds": [
        "201310",
        "207427"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593",
        "169800"
      ],
      "organizationName": "Bearcats Welcome",
      "organizationProfilePicture": "05859b9e-9657-4a7c-b1a1-7847ffe2d18f048e4919-2755-4bad-8b8e-ae160aeed95a.png",
      "organizationNames": [
        "Bearcats Welcome",
        "Campus Outreach"
      ],
      "name": "Sand Volleyball Tournament",
      "description": "<p>Every year we host a sand volleyball tournament outside of Dabney Hall where any student can attend and play. We host this tournament to get to know students, help them connect with each other, as well as help them get to know what our organization is all about. Students can bring their own teams or they can be placed on a team, and the winning team will get some sort of gift-card to share at the end as their prize! This event is fun for anyone, even those who do not want to participate! There is plenty to do as they hang out!</p>",
      "location": "Dabney Hall Sand Volleyball Court",
      "startsOn": "2025-09-03T20:00:00+00:00",
      "endsOn": "2025-09-04T01:00:00+00:00",
      "imagePath": "5520295b-beee-4eaa-903f-f975d9be96b4bf6c8d52-9824-47bb-a9fb-d7b4f84841b5.png",
      "theme": "Social",
      "categoryIds": [
        "10754"
      ],
      "categoryNames": [
        "Department or Office "
      ],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Canceled",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 1,
      "@search.score": 99.4879
    },
    {
      "id": "11490629",
      "institutionId": 4412,
      "organizationId": 384810,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "UC Secular Student Alliance",
      "organizationProfilePicture": "3609ed78-8992-430b-8d11-c8ba89b42589d79a1cce-bc07-411f-8b57-085412c6be2d.png",
      "organizationNames": [],
      "name": "Welcome to the Secular Student Alliance!",
      "description": "<p>Join the Secular Student Alliance for our first meeting of the semester!</p>\r\n<p class=\"x_zfr3Q x_CDt4Ke\" dir=\"ltr\"><span class=\"x_C9DxTc\">The Secular Student Alliance is a dedicated space for students that are secular, and a space dedicated to preserving the right to be secular.</span></p>\r\n<p class=\"x_zfr3Q x_CDt4Ke\" dir=\"ltr\"><span class=\"x_C9DxTc\">As an organization, we support those who do not identify with a religion or wish be subjected to another's religious beliefs, in addition to those who choose to believe in a religion. We believe that a person should be able to believe in any religion they want, or no religion at all. We believe they should be able to&nbsp;</span><span class=\"x_C9DxTc\">proudly express their identity, to promote secular values, setting a course for lifelong activism.</span></p>\r\n<p class=\"x_zfr3Q x_CDt4Ke\" dir=\"ltr\">Join us for snacks, drinks, and discussion on what it means to be secular!</p>",
      "location": "Clifton Court 2110",
      "startsOn": "2025-09-03T20:00:00+00:00",
      "endsOn": "2025-09-03T21:00:00+00:00",
      "imagePath": "581afcc2-1350-4a61-bee7-7023a4cb4ac735af2fc6-0966-4f81-b243-91318014fbb4.png",
      "theme": "Spirituality",
      "categoryIds": [
        "9879"
      ],
      "categoryNames": [
        "Campus Event"
      ],
      "benefitNames": [
        "Free Food",
        "Free Stuff"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 1,
      "@search.score": 99.4879
    },
    {
      "id": "11435740",
      "institutionId": 4412,
      "organizationId": 207427,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Campus Outreach",
      "organizationProfilePicture": "e93895e0-f067-49c9-9228-0de0ec868e660b379be0-eaf3-44ce-8cb0-35c9e4c1d39e.png",
      "organizationNames": [],
      "name": "Sand Volleyball Tournament",
      "description": "<p>Any student can attend and play. We host this tournament to get to know students, help them connect with each other, as well as help them get to know what our organization is all about. Students can bring their own teams or they can be placed on a team, and the winning team will get some sort of gift-card to share at the end as their prize! This event is fun for anyone, even those who do not want to participate! There is plenty to do as they hang out!</p>",
      "location": "Dabney Hall Volleyball Courts",
      "startsOn": "2025-09-03T20:00:00+00:00",
      "endsOn": "2025-09-04T01:00:00+00:00",
      "imagePath": null,
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 6,
      "@search.score": 99.4879
    },
    {
      "id": "11389325",
      "institutionId": 4412,
      "organizationId": 207360,
      "organizationIds": [
        "207360",
        "234268"
      ],
      "branchId": 200593,
      "branchIds": [
        "200593"
      ],
      "organizationName": "CECH Student Services Center",
      "organizationProfilePicture": "42935757-ba48-4d9c-8c6c-9333991c565b8f37359e-b994-4119-8232-e9c624868c2e.png",
      "organizationNames": [
        "CECH Student Services Center",
        "College of Education, Criminal Justice, Human Services, & Information Technology"
      ],
      "name": "Pizza and Planners: Getting Organized and Starting Strong (CECH)",
      "description": "<p>Grab a slice and get started on organizing your semester! Members of the CECH Student Success Team and the Learning Commons will be available to talk with students about strategies for navigating Canvas, planning for the short-term and long-term, and staying on track for a successful semester. Pizza will be provided; bring your own planner or notebook to start logging due dates and important deadlines.&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>Spots are limited, so be sure to RSVP.&nbsp;</p>",
      "location": "Teachers-Dyer Hall, Library Classroom (Room 320)",
      "startsOn": "2025-09-03T20:00:00+00:00",
      "endsOn": "2025-09-03T22:00:00+00:00",
      "imagePath": "3b6a275e-0130-4cf8-a8ce-e8945672a1a74d851420-652d-4e2a-9f22-21fc14e80566.png",
      "theme": "ThoughtfulLearning",
      "categoryIds": [
        "10754",
        "13058"
      ],
      "categoryNames": [
        "Department or Office ",
        "Workshop"
      ],
      "benefitNames": [
        "Free Food"
      ],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 33,
      "@search.score": 99.4879
    },
    {
      "id": "11525946",
      "institutionId": 4412,
      "organizationId": 206944,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Christian Students at UC",
      "organizationProfilePicture": "72813419-8adf-4ceb-9841-3bfa91e19133879d7f6b-43d5-4440-b642-cdaf8b8135d0.png",
      "organizationNames": [],
      "name": "Bible Study",
      "description": "<p>Join us for weekly Bible studies in Clifton Court Hall 2140, Wednesday's at 5p! Our topic for this semester is \"Basic Lessons on Life\", i.e. the life of God. Check us out, join a small group, and dive more into the Bible this semester!&nbsp;</p>",
      "location": "Clifton Court Hall Room 2140",
      "startsOn": "2025-09-03T21:00:00+00:00",
      "endsOn": "2025-09-03T22:00:00+00:00",
      "imagePath": "fd96335c-8383-40a4-b09d-e03eec25b53b55cb7e58-a633-49cb-9b9c-139ba468f995.png",
      "theme": "Spirituality",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": null,
      "longitude": null,
      "recScore": null,
      "rsvpTotal": 0,
      "@search.score": 99.48343
    },
    {
      "id": "11505905",
      "institutionId": 4412,
      "organizationId": 337068,
      "organizationIds": [],
      "branchId": 169800,
      "branchIds": [],
      "organizationName": "Women In CyberSecurity",
      "organizationProfilePicture": "87f706ef-44ec-4db7-900a-83e119dee1b7f34a8304-2156-496b-8eac-4ab72d2a4ac9.png",
      "organizationNames": [],
      "name": "🍦 WiCyS Ice-Cream Social – Chill & Connect",
      "description": "<p><span data-teams=\"true\">Join the University of Cincinnati <strong>Women in Cybersecurity (WiCyS)</strong> for a fun and casual evening at our <strong>Ice Cream Social!</strong> This event is the perfect opportunity to meet new people, connect with fellow members, and learn more about our organization, all while enjoying complimentary ice cream. Whether you&rsquo;re already a member or just curious about WiCyS, this is a welcoming space to network, relax, and start the semester off on the right foot.<br /></span></p>",
      "location": "Teachers Dyer Complex Courtyard (Rain Location: 3rd Floor Lobby)",
      "startsOn": "2025-09-03T21:30:00+00:00",
      "endsOn": "2025-09-03T22:30:00+00:00",
      "imagePath": "b0c8683c-2f69-4de1-b727-9735684e066a5c91b739-088b-48bc-9fcb-e04eae2edbc0.png",
      "theme": "Social",
      "categoryIds": [],
      "categoryNames": [],
      "benefitNames": [],
      "visibility": "Public",
      "status": "Approved",
      "latitude": "39.130440",
      "longitude": "-84.519360",
      "recScore": null,
      "rsvpTotal": 6,
      "@search.score": 99.48119
    }
  ]

  const dummyEventThemes = [
    {
      value: 'all events',
      icon: null,
      iconType: null
    },
    {
      value: "Arts",
      icon: "brush",
      iconType: "material-community"
    },
    {

      value: "Athletics",
      icon: "soccer-ball-o",
      iconType: "font-awesome"
    },
    {
      value: "Community Service",
      icon: "people-carry",
      iconType: "font-awesome-5"
    },
    {
      value: "Cultural",
      icon: "globe",
      iconType: "entypo"
    },
    {
      value: "Group Business",
      icon: "briefcase",
      iconType: "feather"
    },
    {
      value: "Social",
      icon: "hipchat",
      iconType: "fontisto"
    },
    {
      value: "Spirituality",
      icon: "pray",
      iconType: "font-awesome-5"
    },
    {
      value: "Thoughtful Learning",
      icon: "blackboard",
      iconType: "entypo"
    }
  ]

  const fetchEvents = async () => {
    const res = await fetch("https://campuslink.uc.edu/api/discovery/event/search?take=50&endsAfter=2025-08-28T00:00:00Z");
    const data = await res.json();

    setevents(data.value);

  }

  useEffect(() => {
    // If you show user location, request permission first (Android)
    (async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      }
    })();
  }, []);

  useEffect(() => {
    // fetchEvents()
    setevents(dummyEvents)
  }, [])

  const toggleSwitch = () => {
    setisEnabled(!isEnabled)
  }

  const handleCategoryClick = (index: number) => {
    setactiveCategory(index)
  }

  const centerWithOffset = async (
    coord: any,                 // target { latitude, longitude }
    { x = 0, y = 0, zoom = 16 } // x/y in pixels (+y = down)
  ) => {
    if (!mapRef.current) return;

    // 1) Make sure the map knows about the target coordinate
    // (optional but helps correctness if you're jumping far)
    await mapRef.current.animateCamera({ center: coord, zoom }, { duration: 0 });

    // 2) Find the current screen point of the target coordinate
    const pt = await mapRef.current.pointForCoordinate(coord);

    // 3) Compute where you want that coordinate to appear on screen
    // e.g. center (width/2, height/2), top (width/2, height*0.25), bottom (width/2, height*0.75)
    const desired = { x: width / 2 + x, y: height / 2 + y };

    // 4) Shift the map so that the target moves to `desired`
    //    We do that by asking: "Which geo coordinate is currently at `desired`?"
    const newCenter = await mapRef.current.coordinateForPoint(desired);

    // 5) Animate to that center (target will appear at the desired screen position)
    mapRef.current.animateCamera({ center: newCenter, zoom }, { duration: 400 });
  };
  return (
    <View className='relative' style={{ flex: 1 }}>
      <View className='absolute border-white border-2 bg-orange-500 top-0 left-0 z-10 m-10 mt-20 rounded-full overflow-hidden' style={{ width: 60, height: 60 }}>
        <Image
          style={{ width: '100%', height: "100%" }}
          source="https://calquest.s3.us-east-1.amazonaws.com/avatars/leviokoye@gmail.com_1755103361783_avatar.jpg"
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View className='absolute top-0 right-0 z-10 m-10 mt-20 flex-row items-center gap-x-3'>
        <Text>🌞</Text>
        <Switch
          trackColor={{ false: '#FF6F61', true: '#f4f3f4' }}
          thumbColor={isEnabled ? '#FF6F61' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>🌙</Text>
      </View>

      {/* <MapView
        style={{
          width: Platform.OS == 'android' ? width : '100%',
          height: Platform.OS == 'android' ? height : "92%"
        }} 
        {...(Platform.OS === 'android' ? { provider: PROVIDER_GOOGLE } : {})}
        initialRegion={initialPostion}
        userInterfaceStyle={isEnabled ? "dark" : "light"}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onMapReady={() => {
          // Optional: if you had layout issues, you can force an update here
        }}
      /> */}

      {Platform.OS == 'android' && <GoogleMaps.View
        colorScheme={isEnabled ? GoogleMapsColorScheme.DARK : GoogleMapsColorScheme.LIGHT}
        style={{ flex: 1 }}
        cameraPosition={cameraPosition}
        properties={{ isMyLocationEnabled: true }}
        uiSettings={{ myLocationButtonEnabled: true }}
      />}

      {Platform.OS == 'ios' && <MapView
        style={{
          width: '100%',
          height: "100%"
        }}
        ref={mapRef}
        initialRegion={initialPostion}
        userInterfaceStyle={isEnabled ? "dark" : "light"}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onMapReady={() => {
          // Optional: if you had layout issues, you can force an update here
        }}
      >

        {events.filter((e: any) => e.latitude && e.longitude).map((event: any, index: number) => {
          return (
            <Marker
              key={index}
              title={event.name}
              description={event.address}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude
              }}

              onPress={() => {
                setselectedEvent(event)
                bottomSheetRef.current?.snapToIndex(1)
                centerWithOffset({
                  latitude: event.latitude,
                  longitude: event.longitude
                }, { y: height * 0.25, zoom: 19 });
              }}
            />
          )
        })}
      </MapView>}


      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        // style={{ flex: 1 }}
        // index={2}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
      >
        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 150, paddingTop: 8, width: '100%' }}
          showsVerticalScrollIndicator={false}>
          {selectedEvent ? (
            <View className="flex-row items-center justify-between px-5 py-2">
              <View
                className="flex-row items-center"
                style={{ flex: 1, minWidth: 0 }} // allow the text to shrink on Android
              >
                <Text className="text-3xl mr-2">📍</Text>
                <AppText
                  className="text-2xl font-bold capitalize"
                  style={{ flexShrink: 1 }}
                  numberOfLines={2}                // or 1, your call
                  ellipsizeMode="tail"
                >
                  {selectedEvent.name}
                </AppText>
              </View>

              <TouchableOpacity
                onPress={() => setselectedEvent(null)}
                className="flex-row items-center"
                style={{ flexShrink: 0, marginLeft: 12 }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon size={15} color="#4B5563" name="chevron-back" type="ionicon" />
                <AppText style={{ color: "#4B5563", marginLeft: 4 }}>Back</AppText>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ borderBottomWidth: 1 }} className='px-5 py-2 pb-5 flex-row items-center gap-x-3 border-gray-100'>
              <View className=' justify-center items-center rounded-lg' style={{ width: 45, height: 45, backgroundColor: '#FFE2E2' }}>
                <Icon color={ACCENT_COLOR} size={28} name='calendar-month-outline' type='material-community' />
              </View>
              <AppText weight='bold' className='text-3xl font-bold'>Campus Events</AppText>
            </View>
          )}

          {selectedEvent ?
            (
              <View className='mx-5 mt-5'>
                 <RenderHTML source={{ html: selectedEvent.description }} />
              </View>
            )
            :
            (
              <React.Fragment>
                <FlatList
                  style={{ marginTop: 15 }}
                  horizontal
                  data={dummyEventThemes}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  // nestedScrollEnabled
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleCategoryClick(index)} key={index} className='px-8 py-3 rounded-3xl flex-row items-center gap-x-2' style={{ backgroundColor: activeCategory == index ? ACCENT_COLOR : "#F3F4F6", height: 55, marginLeft: 10 }}>
                      {item.icon && <Icon size={20} color={activeCategory == index ? 'white' : '#4B5563'} name={item.icon} type={item.iconType} />}
                      <AppText weight='bold' style={{ color: activeCategory == index ? 'white' : "#4B5563" }} className='font-bold text-lg capitalize'>{item.value}</AppText>
                    </TouchableOpacity>
                  )}
                />


                <View className='mt-10 px-5'>

                  {events.filter((e: any) => e.latitude && e.longitude).slice(0, 5).map((event: Event, index: number) => {
                    return (
                      <TouchableOpacity onPress={() => {
                        router.push({
                          pathname: "/specific-event",
                          params: {
                            eventData: JSON.stringify({ ...event, iconType: 'entypo', iconName: 'code', theme: colorCombos[Math.floor(Math.random() * 12)] })
                          }
                        });
                      }} key={index}>
                        <EventCard
                          name={event.name}
                          iconName='code'
                          iconType='entypo'
                          category={event.categoryNames}
                          description={event.description}
                          date={event.startsOn}
                          location={event.location}
                          theme={colorCombos[Math.floor(Math.random() * 12)]}
                        />
                      </TouchableOpacity>
                    )
                  })}
                </View>

                <TouchableOpacity onPress={() => router.push("/(screens)/all-events")} className='mt-5' >
                  <AppText weight='bold' style={{ backgroundColor: ACCENT_COLOR }} className='px-8 py-2 rounded-3xl text-white self-center text-xl font-bold'>View more...</AppText>
                </TouchableOpacity>
              </React.Fragment>
            )
          }

        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

