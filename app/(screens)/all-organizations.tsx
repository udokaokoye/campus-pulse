import { AppText } from '@/components/AppText'
import { Icon } from '@/components/Icon'
import OrganizationCard from '@/components/OrganizationCard'
import { GRAY_BG } from '@/utils/constants'
import { ThemeContext } from '@/Store/ThemeContext'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
const AllOrganizations = () => {
    const { isDark } = useContext(ThemeContext);

    const allOrgs = [
        {
            "@search.score": 1.0,
            "Id": "236805",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": " A Moment of Magic at the University of Cincinnati",
            "ShortName": "AMoM",
            "WebsiteKey": "amomuc",
            "ProfilePicture": "26228ad8-fc54-4698-bfe3-170c3a5bd21eb6e89263-135f-4ff7-9b0c-865251442866.png",
            "Description": "<div style=\"display: block; font-size: 16px; line-height: 16px; margin-left: 0px; padding: 20px 16px 16px 16px;\">\r\n<div style=\"border-left-color: #f2f2f2; border-left-style: solid; border-left-width: 6px; color: #424242; font-size: 16px; height: auto; line-height: 1.5em; overflow: hidden; padding-left: 16px; text-overflow: ellipsis; white-space: normal; margin: 4px 0px 0px 0px;\">\r\n<p style=\"padding: 0.25em 0px 0.25em 0px;\">The mission of the University of Cincinnati Chapter of A Moment of Magic is to harness the power of play to spark joy, foster connection, reduce isolation, and support the mental health and emotional healing of medically vulnerable children and their families.</p>\r\n<p>&nbsp;</p>\r\n<p>The services we provide include: Character visits, virtual visits, &amp; Express Create Heal programming - creative interventions that teach children emotional regulation and self-confidence skills to help them process the complex feelings that come with medical adversities.</p>\r\n<p>&nbsp;</p>\r\n<p>AMoM UC is a wonderful way to get service hours! We have character and non-character roles, so you don't have to dress up to be a part of the magic (but you absolutely can!).</p>\r\n<p>&nbsp;</p>\r\n<p>A Moment of Magic Foundation is a national 501(c)(3) nonprofit organization.</p>\r\n</div>\r\n</div>",
            "Summary": "The mission of the University of Cincinnati Chapter of A Moment of Magic is to improve the quality of life of vulnerable and underserved children and inspire them to be brave, strong, and fearless through fun and engaging social wellness activities.",
            "CategoryIds": [
                "10789",
                "10790",
                "10795",
                "10797",
                "10800",
                "14391"
            ],
            "CategoryNames": [
                "Community Service",
                "Creative & Performing Arts",
                "Cultural",
                "Professional",
                "Special Interest",
                "Health & Wellness"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "372039",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": " Delta Tau Kappa Interdisciplinary Honorary Society",
            "ShortName": "DTK",
            "WebsiteKey": "dtk",
            "ProfilePicture": "d759aa20-cc48-41b3-bc93-755bcab4de5a78e09793-5c22-48e8-a77a-7d74024c922f.jpg",
            "Description": "<p>Delta Tau Kappa was founded by the late Dr. Oleg Zinam, late Professor of Economics, some 50 years ago.&nbsp; The current revival is being supported by its faculty advisor, who is a member of Delta Tau Kappa.&nbsp; Students will come together at monthly meetings to discuss a wide range of topics that are interdisciplinary in nature.&nbsp; We will also host one guest speaker from our region per year, who can discuss how disciplinary knowledge if vital and applicable to real world work and experience.</p>",
            "Summary": "This organization will promote the value interdisciplinary studies across all disciplines here at the University of Cincinnati.  It will encourage interdisciplinary readings, discussions, and presentation at its meetings. ",
            "CategoryIds": [
                "10788",
                "10793"
            ],
            "CategoryNames": [
                "Academic",
                "Honorary"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "389266",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": " Gujarati Student Association ",
            "ShortName": "GUSA",
            "WebsiteKey": "gusa",
            "ProfilePicture": "1ea557c7-9d12-4d5f-9fcf-320a5373be6fcb72f62d-830b-4f96-8d61-464a4b1215f4.png",
            "Description": "<p>Our association&nbsp;organizes cultural festivals, language workshops, dance performances, and fun events to help promote Gujarati culture.</p>\r\n<p>In the South Asian Community, heart issues are frequently found. Through our organization we want to bring awareness regarding heart health during our events. We have partnered with Red Saree, a Cincinnati based nonprofit that&nbsp;provides healthcare awareness among South Asians around the world through engaging community, research and educational activities towards a happier and healthier life.</p>\r\n<p>&nbsp;</p>",
            "Summary": "Gujarati Student Association  is an inclusive community dedicated to celebrating Gujarati culture, traditions, and heritage. Our association brings together students of Gujarati descent as well as those interested in learning more about Gujarati culture.",
            "CategoryIds": [
                "10795"
            ],
            "CategoryNames": [
                "Cultural"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207317",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": " It's On Us UC Student Organization",
            "ShortName": "IOU",
            "WebsiteKey": "itsonusuc",
            "ProfilePicture": "1890456f-3817-46aa-bdf9-333bc7e07ab2742f6a56-0d29-495d-a523-bae9b0496a75.png",
            "Description": "<p>It's On Us UC Student Organization is a campus community engagement initiative dedicated to ending sexual and gender-based violence on and around our campus through education, intervention, and support. We welcome and support all advocates and survivors, and believe it is the responsibility of all students to create a safer campus.&nbsp;</p>\r\n<p>&nbsp;</p>",
            "Summary": "It's On Us UC Student Organization is a campus community engagement initiative dedicated to ending sexual and gender-based violence on and around our campus through education, intervention, and support. ",
            "CategoryIds": [
                "10796",
                "10800",
                "14391"
            ],
            "CategoryNames": [
                "Political & Activitist",
                "Special Interest",
                "Health & Wellness"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206708",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": " Nonprofit Organizational Leadership Association",
            "ShortName": "NOLA",
            "WebsiteKey": "association-of-fundraising-professionals",
            "ProfilePicture": "b15e7087-3ed6-40b2-998f-aa4cfc6125817b5f7e6c-60d4-47cf-a406-89fadf8f46fb.PNG",
            "Description": "<p>Our mission at UC is simple: educate our student peers about the impact of philanthropy on campus, expose others to the field of fundraising/university advancement, and serve as a resource to enhance Organizational Leadership - Nonprofit and Community Leadership students and all other majors. We plan on fulfilling this mission by providing students with the best educational, professional, service, and social experiences that relate to the field of advancement and philanthropy. With the support of the AFP Greater Cincinnati Professional Chapter and the Organizational Leadership Major housed in Arts &amp; Sciences Psychology, we believe that we will have remarkable success. Extensive networking opportunities will be available as well as connections to internships. We also offer networking opportunities and professional event opportunities with the Greater Cincinnati AFP professional chapter and the possibility to interact with generous benefactors.&nbsp;If you're interested, we invite you to come to an AFP-NOLA meeting and see all that our organization has to offer. We have a great year coming up with educational sessions covering a wide range of topics.&nbsp;</p>",
            "Summary": "Educate our student peers about the impact of philanthropy on campus, expose others to the field of fundraising/university advancement, & serve as a resource to enhance Organizational Leadership - Nonprofit and Community Leadership students & all majors.",
            "CategoryIds": [
                "10788",
                "10789",
                "10797",
                "10800"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Professional",
                "Special Interest"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "387753",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": " Pride in Engineering at the University of Cincinnati",
            "ShortName": "PIE UC",
            "WebsiteKey": "pieuc",
            "ProfilePicture": "88c765a7-f472-414e-9cc5-dedd06afd1cf1402e1be-a59b-42e2-8230-cfef52d89bed.JPG",
            "Description": "<p>PIE focuses on creating a safe space for queer/trans engineering students to find community, becoming educated on important resources for queer people in engineering, and promoting professional growth through a network of people.</p>",
            "Summary": "PIE focuses on creating a safe space for queer/trans engineering students to find community, becoming educated on important resources for queer people in engineering, and promoting professional growth through a network of people.",
            "CategoryIds": [
                "10794",
                "10796",
                "10797",
                "17192"
            ],
            "CategoryNames": [
                "LGTBQ+",
                "Political & Activitist",
                "Professional",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "323848",
            "InstitutionId": 4412,
            "ParentOrganizationId": 319614,
            "BranchId": 319614,
            "Name": " UC Blue Ash Career Services Office",
            "ShortName": "UCBA Career Services",
            "WebsiteKey": "ucbacareerservices",
            "ProfilePicture": "01963e39-eab7-4d54-816c-e0a7890ef187ce9fafd6-706b-40b4-9b82-9cd843afbf63.jpg",
            "Description": "<p>The UC Blue Ash Career Services Office is here to help with all things related to career education and professional development. We can help with career exploration, career coaching, professional development workshops, interviewing, job searches and so much more. Need a resume? Career Services can help you create one that shines! Need help preparing for an interview? Come in for a mock interview! Our office will work with you through in-class instruction or one-on-one sessions to navigate the career readiness process no matter the need.</p>",
            "Summary": "The UC Blue Ash Career Services Office is here to help with all things related to career education and professional development. We can help with career exploration, career coaching, professional development workshops, interviewing & job searches. ",
            "CategoryIds": [
                "10797"
            ],
            "CategoryNames": [
                "Professional"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207136",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200592,
            "BranchId": 200592,
            "Name": " University of Cincinnati Esports Club",
            "ShortName": "UC Esports",
            "WebsiteKey": "esports",
            "ProfilePicture": "c0acac67-115a-4ff9-bfde-64b65031bdcf20931c0c-bcf2-40a8-b004-c7b87266a1f3.png",
            "Description": "<p><span style=\"font-weight: 400;\">The purpose of this organization is to provide a safe and fun environment for university students to participate in competitive games, act as the main source of funding and communication, and help facilitate intra-mural and inter-mural collegiate competition.&nbsp;</span></p>\r\n<p><span style=\"font-weight: 400;\">Every semester, we hold events for various games and foster a competitive community for multiple games.</span></p>\r\n<p><span style=\"font-weight: 400;\"><br />Most of our interactions occur on our Discord server, which has over 1,100 members and counting.<br /></span></p>",
            "Summary": "The home for gaming on campus. We offer multiple gaming-oriented experiences both casual and competitive. We host tournaments both for UC Students and as inter-collegiate competitions! Most of our activity and updates happen on our Discord server.",
            "CategoryIds": [
                "10789",
                "10794",
                "10798",
                "10800",
                "18065"
            ],
            "CategoryNames": [
                "Community Service",
                "LGTBQ+",
                "Recreation",
                "Special Interest",
                "Esports"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "360391",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200593,
            "BranchId": 200593,
            "Name": "1819 Innovation Hub",
            "ShortName": "CID",
            "WebsiteKey": "cincyid",
            "ProfilePicture": "bd372ecc-5821-4b9e-98ef-aefaaaedf32b734487ec-aed2-4f8e-a454-15c27a74131d.jpg",
            "Description": "<p>Rooted in the rich legacy of the UC, established in 1819, the UC 1819 Innovation Hub is an active epicenter for groundbreaking initiatives connecting UC with corporate, startup and community partners like P&amp;G, Microsoft and W&amp;S.&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>The 1819 Innovation Hub is the UC's front door for industry, inventors, innovators and entrepreneurs to accelerate ideas from conception - resulting in real-world impact.</p>",
            "Summary": "1819 Innovation Hub",
            "CategoryIds": [],
            "CategoryNames": [],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "386833",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "3D Design & Automation Club",
            "ShortName": "3DDAC",
            "WebsiteKey": "3ddac",
            "ProfilePicture": "db074a1a-ab74-46c0-aaee-dc06c7d236925811c26a-f722-4a66-a190-0232931750e0.jpg",
            "Description": "<p>The mission of 3D Design &amp; Automation Club is to foster a collaborative environment where members can explore, learn, and contribute to the exciting fields of 3D printing and Automation. We aim to provide a platform for skill development, knowledge sharing, and hands-on experiences.</p>\r\n<p>&nbsp;</p>",
            "Summary": "Welcome to the 3D Design & Automation Club, a community of enthusiasts passionate about delving into the realms of 3D printing and Automation. ",
            "CategoryIds": [
                "10788",
                "10797",
                "10800",
                "17192"
            ],
            "CategoryNames": [
                "Academic",
                "Professional",
                "Special Interest",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206704",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "A.M.B.I.T.I.O.N",
            "ShortName": "Advising Many By Inspiring and Transforming Them Into Outstanding Nurses",
            "WebsiteKey": "ambition",
            "ProfilePicture": "e80e7ca9-d656-400d-a26a-e500da0aaf7b74de120a-9fc3-443b-863f-2b5f7130a86a.png",
            "Description": "<p>The purpose of AMBITION is to&nbsp;<span style=\"font-weight: 400;\">provide a sense of community to underrepresented students enrolled in the University in Cincinnati College of Nursing, University of Cincinnati Blue Ash Nursing program, or Interdisciplinary Nursing Preparation.</span></p>",
            "Summary": "AMBITION (Advising Minorities By Inspiring and Transforming Them Into Outstanding Nurses) works to prepare students to be academically challenged and successful throughout their career within the College of Nursing and beyond.",
            "CategoryIds": [
                "10788",
                "10789",
                "10795",
                "10797",
                "10798",
                "10800",
                "14391"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Cultural",
                "Professional",
                "Recreation",
                "Special Interest",
                "Health & Wellness"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "389578",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Aamhi Marathi Student Association",
            "ShortName": "AMSA",
            "WebsiteKey": "uc_amsa",
            "ProfilePicture": "62d9a770-66f4-4f48-9c9a-08c4ef51628446ab4e9c-b3bb-411d-8133-0bcc500dee20.png",
            "Description": "<p style=\"font-weight: 400;\">The main purpose of the Amhi Marathi Student Association Club is to provide a platform for students who speak Marathi or are interested in Marathi culture to come together, celebrate their cultural heritage, and engage in activities that promote cultural awareness and understanding. This club aims to foster a sense of community among Marathi-speaking students, provide opportunities for cultural enrichment through events, workshops, and discussions, and create a supportive environment where members can connect, learn, and grow together. Additionally, the Amhi Marathi Student Association Club may also serve as a resource for students to learn more about Marathi language, traditions, and customs, while also promoting diversity and inclusion within the broader campus community.</p>",
            "Summary": "The Marathi Student Association Club celebrates Marathi culture through events, workshops, and community service. We promote cultural awareness, provide educational resources, and foster a sense of belonging among members.",
            "CategoryIds": [
                "10788",
                "10789",
                "10790",
                "10795",
                "10798",
                "10799"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Creative & Performing Arts",
                "Cultural",
                "Recreation",
                "Religious"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "231850",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200593,
            "BranchId": 200593,
            "Name": "Accessibility Resources",
            "ShortName": "Accessibility Resources",
            "WebsiteKey": "accessibility",
            "ProfilePicture": null,
            "Description": "<p>At UC, we are committed every day to providing full and equal access to students, employees and visitors with disabilities. The University is actively engaged in improving the accessibility of our community, in the classroom, in the workplace, on campus, and online.</p>",
            "Summary": "Office of Accessibility Resources",
            "CategoryIds": [],
            "CategoryNames": [],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "389267",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "ACLU Action Team",
            "ShortName": null,
            "WebsiteKey": "acluactionteam",
            "ProfilePicture": "ccc493b3-03b9-467a-8742-c3a4f6099623c091d656-2bc1-434e-a553-34ade9dc68fe.jpg",
            "Description": "<p><span class=\"x_x_x_x_x_x_TextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\" lang=\"EN-US\"><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">The ACLU Campus Action Team</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> at UC</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> works on campus to recruit, organize, and change UC for the betterment of its students</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">. </span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">Through leadership development, base-building, and</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> political community involvement, students will be able to build real student power and gain real-world experience organizing in public spaces</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">.</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">&nbsp;We provide</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> members and the UC community with</span> <span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> trainings</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">, resources, and relationship-building opportunities throughout the school yea</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">r. </span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">The Campus Action Team </span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">will be</span> <span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> essential in amplifying student voices and creating </span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">the </span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\">equitable</span><span class=\"x_x_x_x_x_x_NormalTextRun x_x_x_x_x_x_SCXW220923566 x_x_x_x_x_x_BCX4\"> and just UC and Ohio we envision. </span></span>Join our GroupMe to work toward a better UC and Ohio: <a href=\"https://groupme.com/join_group/98986599/MoKdhJot\"> https://groupme.com/join_group/98986599/MoKdhJot&nbsp;</a></p>",
            "Summary": "The ACLU Campus Action Team at UC works on campus to recruit, organize, and change UC for the betterment of its students. ",
            "CategoryIds": [
                "10796"
            ],
            "CategoryNames": [
                "Political & Activitist"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206947",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "ADVANCE",
            "ShortName": "ADVANCE",
            "WebsiteKey": "advance1986",
            "ProfilePicture": "4ab0ed15-7784-4ecb-abd0-69b4922be5ba9b69e459-cdf1-47b8-ac22-5710dcd90410.png",
            "Description": "<div class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_txtNew\"><strong>PURPOSE</strong></div>\r\n<div id=\"x_x_x_x_x_x_x_x_x_x_x_x_x_WRchTxt4-gx4\" class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_txtNew\">ADVANCE aims to bring a fresh perspective to campus organizations by focusing on the development of students of color in the workforce and throughout their professional lives.</div>\r\n<div id=\"x_x_x_x_x_x_x_x_x_x_x_x_x_WRchTxt5-7c6\" class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_txtNew\">\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">&nbsp;</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\"><strong>MISSION</strong></p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">Ever been interested in learning the art of \"networking\"?</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">Would you like to connect with employers interested in students of color?</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">Well, join ADVANCE and instantly have access to hundreds of connections to better your career and better your best! 💫</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">&nbsp;</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\"><strong>SOCIAL MEDIA</strong></p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">Stay connected and follow our Instagram @ADVANCE_UC and twitter @UC_ADVANCE for updates on our current programs and events.</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">&nbsp;</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\">Here's a 2012 video of one of our biggest annual programs, The Corporate Excursion.&nbsp;&nbsp;</p>\r\n<p class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_font_8\"><a href=\"https://www.youtube.com/watch?v=wtF3ck8yx2c\">https://www.youtube.com/watch?v=wtF3ck8yx2c</a></p>\r\n</div>",
            "Summary": "ADVANCE brings a fresh perspective to campus organizations by focusing on the development of students of color in the workforce and throughout their professional lives. ",
            "CategoryIds": [
                "10788",
                "10789",
                "10797"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Professional"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206965",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Advanced Medical Imaging Technology (AMIT) Student Organization",
            "ShortName": "Advanced Medical Imaging Technology (AMIT) Student Organization",
            "WebsiteKey": "advanced-medical-imaging-technology-amit-student-o",
            "ProfilePicture": "bb1c2f45-13c3-4b3b-8b9a-7e6d825937ef32791e1c-3e64-49bc-bbcd-8a46e60d23da.jpg",
            "Description": "<p>The Advanced Medical Imaging Technology student organization is a dynamic and innovative community dedicated to exploring and understanding cutting-edge techniques and technologies in the field of medical imaging. With a focus on fostering learning, collaboration, and professional growth, our organization provides a unique platform for students interested in the intersection of healthcare and technology.</p>\r\n<p>Our members engage in a variety of activities that delve into the world of advanced medical imaging. Through interactive workshops, seminars, and guest speaker sessions, we offer comprehensive insights into the latest advancements in radiology, MRI (Magnetic Resonance Imaging), Nuclear Medicine, PET (Positron Emission Tomography), and other emerging imaging modalities. We explore the principles behind image acquisition, processing, and interpretation, and their crucial role in accurate disease diagnosis, treatment planning, and medical research.</p>\r\n<p>In addition to educational events, our organization also emphasizes hands-on experiences. Members will participate in practical demonstrations of imaging equipment, learn about image reconstruction algorithms, and even engage in simulated diagnostic scenarios. These experiences foster a deep understanding of the technology and its implications, preparing members for future careers in medical imaging, radiology, and related healthcare professions.</p>\r\n<p>The Advanced Medical Imaging Technology student organization welcomes students from diverse backgrounds, including medicine, engineering, computer science, and biology. Whether you're an aspiring radiologist, a curious technologist, or someone intrigued by the potential of medical imaging, joining us will provide you with valuable knowledge, networking opportunities, and a platform to explore the exciting frontiers of advanced medical imaging technology.</p>",
            "Summary": "The purpose of the AMIT student organization is to learn more about medical imaging, network with fellow students, and open avenues of education otherwise unachievable.",
            "CategoryIds": [
                "10788",
                "10797",
                "10800",
                "17240"
            ],
            "CategoryNames": [
                "Academic",
                "Professional",
                "Special Interest",
                "College of Allied Health Sciences Student Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "358019",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Adventure JDs",
            "ShortName": null,
            "WebsiteKey": "adventurejds",
            "ProfilePicture": null,
            "Description": "<p>Adventure JDs Mission Statement:</p>\r\n<p>Adventure JDs strives to enrich the lives of the students at Cincinnati Law to step outside of their everyday professional lives and work to find joy in movement and the outdoors. This club is designed to inspire creativity and connection through outdoor experiences and adventure.</p>",
            "Summary": "Law School Student Organization for UC Law Students to get out of the classroom and enjoy the outdoors.",
            "CategoryIds": [
                "10792",
                "10798",
                "14391",
                "18597"
            ],
            "CategoryNames": [
                "Graduate",
                "Recreation",
                "Health & Wellness",
                "College of Law"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206978",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200592,
            "BranchId": 200592,
            "Name": "AeroCats",
            "ShortName": "AeroCats",
            "WebsiteKey": "aerocats",
            "ProfilePicture": "604175dd-2f1a-4e03-8c61-d8ab530f3ab593a35e8c-3d8d-43ac-91c2-094abaee8ff8.jpg",
            "Description": "<p>To design, build, fly, and compete RC and UAVs in national intercollegiate competitions. This organizations allows students from all majors to learn how to build functioning aircraft! You don't have to be an aerospace engineer to join this organization, we want students from all colleges on campus to join this exciting competition. Designing, building and flying an aircraft takes more than technical knowledge, we need people to fundraise, speak to industry sponsors, procure materials, and so much more! If any of this sounds interesting to you please come to one of our general body meetings!&nbsp;</p>",
            "Summary": "To design, build, fly, and compete RC and UAVs in national intercollegiate competitions.",
            "CategoryIds": [
                "10788",
                "16553",
                "17192"
            ],
            "CategoryNames": [
                "Academic",
                "Academic Intercollegiate Competition",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206992",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Aerospace Engineering Graduate Student Association",
            "ShortName": "AE GSA",
            "WebsiteKey": "aerospace-engineering-graduate-student-association",
            "ProfilePicture": "242e9da2-9f74-43aa-956f-57a980a8abf60c5d6103-76e0-4e05-a2d6-17db4eecc278.png",
            "Description": "<p>The purpose of the Aerospace Engineering Graduate Student Association is to represent the graduate students in the Department of Aerospace Engineering and Engineering Mechanics and serve as a voice for the students across various University associations.</p>",
            "Summary": "The purpose of the Aerospace Engineering Graduate Student Association is to represent the graduate students in the Department of Aerospace Engineering and Engineering Mechanics and serve as a voice for the students to various University associations",
            "CategoryIds": [
                "10788",
                "10791",
                "10792",
                "17192"
            ],
            "CategoryNames": [
                "Academic",
                "Governance & Tribunals",
                "Graduate",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "320210",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "AFFIRM",
            "ShortName": "AFFIRM",
            "WebsiteKey": "affirm",
            "ProfilePicture": "60879f24-4530-4beb-9f23-3ece959dc752c4b4798c-57ed-4334-aceb-34b6e455c358.png",
            "Description": null,
            "Summary": "The purpose of AFFIRM is to promote programs and events related to Diversity, Equity, and Inclusion to students and to promote opportunities for students to create inclusive social change in the community through community service and advocacy.",
            "CategoryIds": [
                "10795"
            ],
            "CategoryNames": [
                "Cultural"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "334928",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "All Sports ",
            "ShortName": "ALSP",
            "WebsiteKey": "all_sports",
            "ProfilePicture": "4cd9a1bf-5bf5-492e-bf63-3d278e6b77adc92f210c-66c6-403d-b94d-ff21ea8de095.jpg",
            "Description": "<p>All Sports is a club for students to meet new people while playing their favorite sports. One week we might play a soccer game, and the next week throw the football around. Students will have the opportunity to play sports for fun, with other people who also enjoy sports. Anyone is welcome to join, whether you played sports in high school, or just want something to do to stay active. We will also have throwback days where we play games that we used to do in gym class as kids. Some games we play are Kickball, Football, Soccer, Wiffleball, Spikeball, Volleyball and Ultimate Frisbee. We also go to events such as FC Cincinnati and Cincinnati Reds games! This club will allow students to play the sports they love, but not at the competitive D1 level of UC Athletics. &nbsp;Please Join the GroupMe for updated information and weekly meet times and locations as well as sports will play! We meet Tuesdays at 6:30pm!</p>\r\n<p><a href=\"https://groupme.com/join_group/67227535/qn104XzB\">All Sports GroupMe</a></p>",
            "Summary": "All Sports is a club for students to meet new people while playing sports. Students will have the opportunity to play their favorite sports for fun. A great place to meet new people while playing sports they love for fun!",
            "CategoryIds": [
                "10798"
            ],
            "CategoryNames": [
                "Recreation"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206993",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Alliance",
            "ShortName": null,
            "WebsiteKey": "alliancecincinnati",
            "ProfilePicture": "0ea2ddc4-012a-479e-9f19-c0e44880aeedd0581c4b-0d91-4f30-98a9-596111864f1e.png",
            "Description": "<p>Alliance is a student led organization for members of the LGBTQ community and their Allies. We pursue individuality, education, friendship, and betterment of our community through social, educational, and activist events.&nbsp;</p>",
            "Summary": "Alliance is a student led organization for members of the LGBTQ community and their Allies. We pursue individuality, education, friendship, and betterment of our community through social, educational, and activist events.",
            "CategoryIds": [
                "10794",
                "10795",
                "10796",
                "10800"
            ],
            "CategoryNames": [
                "LGTBQ+",
                "Cultural",
                "Political & Activitist",
                "Special Interest"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "402201",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "ALPFA at the University of Cincinnati",
            "ShortName": "ALPFA",
            "WebsiteKey": "alpfa",
            "ProfilePicture": "7af81043-ed39-4c7a-bbf6-fda6525c2df17dedabe9-582c-4410-912f-b38dcfc8b257.jpg",
            "Description": "<p>The Association of Latino Professionals for America (ALPFA) is a national organization<br />dedicated to empowering and developing students into future leaders.<br /><br />This student-led organization is dedicated to supporting the professional development of students through educational opportunities, networking opportunities, and access to job and internship placements for Latino young professionals.</p>",
            "Summary": "The Association of Latino Professionals for America (ALPFA) is a national organization dedicated to empowering and developing students into future leaders.\r\n\r\n",
            "CategoryIds": [
                "10795",
                "10797"
            ],
            "CategoryNames": [
                "Cultural",
                "Professional"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207003",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Alpha Epsilon Delta",
            "ShortName": "AED",
            "WebsiteKey": "alpha-epsilon-delta",
            "ProfilePicture": "b0065c6f-9ebb-47f3-b801-49eff6661d9cbb550807-a4c6-45b6-8263-b2a82d8496cd.jpeg",
            "Description": "<p>Alpha Epsilon Delta is the National Health Pre-Professional Honor Society dedicated to the encouragement and recognition of excellence in pre-professional health scholarship, including medicine, physician assistantship,&nbsp; dentistry, and more. The Society welcomes all students engaged in the pursuit of a professional healthcare career in these fields. AED offers opportunities for intellectual and professional development, provides a forum for students with common interests, and extends a program of service to benefit the college/university community. Here at UC, it is the only nationally recognized pre-medical and pre-dental honorary organization on campus.</p>\r\n<p>AED&nbsp;is a way for students of a common professional goal to come together and help each other reach that goal. Here at UC&rsquo;s chapter of AED one can expect weekly meetings on Thursday evenings featuring guest speakers and panels, as well as numerous fundraisers, service activities, and social events throughout the semester.&nbsp;</p>\r\n<p>At the beginning of each semester, applications for new general body members are reviewed. <strong>Those who have not completed an application are more than welcome to attend all events and meetings</strong>, with the exception that they may not vote in elections or apply for national membership.</p>\r\n<p>Please check our Instagram for updates about recruitment in the fall and meeting dates.</p>",
            "Summary": "Alpha Epsilon Delta is the national pre-medical, pre-dental, and pre-physician assistant honor society. At UC's Ohio-Lambda chapter, we host guest speakers and hold numerous fundraisers, service activities, and social events throughout the semester.",
            "CategoryIds": [
                "10788",
                "10793",
                "10800"
            ],
            "CategoryNames": [
                "Academic",
                "Honorary",
                "Special Interest"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206983",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200594,
            "BranchId": 200594,
            "Name": "Alpha Epsilon Pi",
            "ShortName": "AEPi",
            "WebsiteKey": "alpha-epsilon-pi",
            "ProfilePicture": "d01d6afb-7a14-4763-af9f-6ddd34b7b3a2c744daac-5c5a-44f9-ae69-d51be1c1bb57.png",
            "Description": "<p>Omicron Deuteron of the Alpha Epsilon Pi Fraternity. Founded at the University of Cincinnati in 1920</p>",
            "Summary": "Omicron Deuteron of the Alpha Epsilon Pi Fraternity. Founded at the University of Cincinnati in 1920",
            "CategoryIds": [],
            "CategoryNames": [],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206996",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200594,
            "BranchId": 200594,
            "Name": "Alpha Kappa Alpha Sorority, Inc.",
            "ShortName": "AKA",
            "WebsiteKey": "alpha-kappa-alpha-sorority-inc",
            "ProfilePicture": "0a4b7ba9-a142-4be5-8018-d5fbaf8ef0e9c6673579-c33f-4631-9963-7e3323255db5.png",
            "Description": "<p>Alpha Kappa Alpha exists to be of 'Service to all Mankind.'</p>",
            "Summary": "Alpha Kappa Alpha exists to be of 'Service to all Mankind.'",
            "CategoryIds": [],
            "CategoryNames": [],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207019",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Alpha Kappa Psi",
            "ShortName": "AKPsi",
            "WebsiteKey": "alphakappapsi",
            "ProfilePicture": "8b447b35-a088-44c9-988e-dcab377e0a4b238e401a-8fc6-4e32-a9ba-6617191d3ed8.png",
            "Description": "<p>Alpha Kappa Psi is recognized as the premier developer of principled business leaders worldwide, since 1904.</p>\r\n<p>&nbsp;</p>\r\n<p>Our goal is to build and refine the professional skills of all members. The Eta Chapter also strives to create a close knit community of like-minded individuals for personal professional growth.</p>\r\n<p>&nbsp;</p>\r\n<p>We accept all majors and are a co-ed organization. The Eta Chapter currently boasts 160+ members of almost 50 majors, including Accounting, Finance, Marketing, Real Estate, Engineering, Industrial Management, Pre-Occupational Therapy, Nursing, and many more.</p>\r\n<p>&nbsp;</p>\r\n<p>Visit akpsiuc.com/recruitment for more information on joining AKPsi this spring!</p>",
            "Summary": "Alpha Kappa Psi is recognized as the premier developer of principled business leaders. Our goal is to build and refine the professional skills of all members. We accept all majors.",
            "CategoryIds": [
                "10788",
                "10789",
                "10797",
                "16324"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Professional",
                "Lindner Student Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207109",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Alpha Omega",
            "ShortName": "Disciples on Campus",
            "WebsiteKey": "alphaomega",
            "ProfilePicture": "04de5fc8-7082-431b-bc8d-2eda73a3ed1d6832c048-fee8-4e10-aa4d-7809e1bb1099.jpg",
            "Description": "<p>In revelations 1:8 it reads</p>\r\n<p>&ldquo;&ldquo;I am the Alpha and the Omega,&rdquo; says the Lord God, &ldquo;who is, and who was, and who is to come, the Almighty.&rdquo;&rdquo;<br />‭</p>\r\n<p>Alpha Omega is a non denominational Christian organization on Campus full of students who are devoted to building a stronger relationship with God through fellowship with one another and careful study of God's Word. We celebrate the completeness we have in Christ through his victory on the Cross and the life we now get to live walking in his steps.</p>",
            "Summary": "Alpha Omega is an organization of students fully devoted to building a stronger relationship with God through fellowship with one another and careful study of God's Word.",
            "CategoryIds": [
                "10799"
            ],
            "CategoryNames": [
                "Religious"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207008",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200594,
            "BranchId": 200594,
            "Name": "Alpha Phi Alpha Fraternity, Inc.",
            "ShortName": "Alpha Phi Alpha Fraternity, Inc.",
            "WebsiteKey": "alpha-phi-alpha-fraternity-inc",
            "ProfilePicture": "7eb8ec74-633e-41d9-a126-d10f4b955301a55d309b-8972-470d-a70b-d55387eba743.jpg",
            "Description": "<p>Alpha Phi Alpha, the first intercollegiate Greek-letter fraternity established for African American Men, was founded at Cornell University in Ithaca, New York by seven college men who recognized the need for a strong bond of brotherhood among African descendants in this country. The visionary founders, known as the &ldquo;Jewels&rdquo; of the fraternity, are Henry Arthur Callis, Charles Henry Chapman, Eugene Kinckle Jones, George Biddle Kelley, Nathaniel Allison Murray, Robert Harold Ogle, and Vertner Woodson Tandy. The fraternity initially served as a study and support group for minority students who faced racial prejudice, both educationally and socially, at Cornell. The Jewel founders and early leaders of the fraternity succeeded in laying a firm foundation for Alpha Phi Alpha's principles of scholarship, fellowship, good character, and the uplifting of humanity.</p>",
            "Summary": "Alpha Phi Alpha, the first intercollegiate Greek-letter fraternity established for African American Men, was founded at Cornell University in Ithaca, New York by seven college men who recognized the need for a strong bond of brotherhood among African d...",
            "CategoryIds": [],
            "CategoryNames": [],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206705",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Alpha Phi Omega",
            "ShortName": "A Phi O",
            "WebsiteKey": "alpha-phi-omega",
            "ProfilePicture": "a63fac24-0cf9-4173-995f-3d347087fc045fb07dab-0205-4377-8ad0-af925f75ce88.jpeg",
            "Description": "<p style=\"text-align: center;\"><strong>About Us</strong></p>\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n<p>Alpha Phi Omega is an international, gender-inclusive service fraternity. It has three cardinal principles: leadership, friendship, and service. Established in 1925 at Lafayette College in Easton, PA, it has its roots in the Boy Scouts of America and the World Scouting Movement. The Delta Alpha chapter at the University of Cincinnati is one of nearly 400 chapters worldwide and was established in 1942. We welcome any UC students to join us in growing in leadership, friendship, and service. To see a list of our events, please visit our&nbsp;<a href=\"https://www.apoonline.org/deltaalpha/calendar.php\" target=\"_blank\" rel=\"noopener\">website</a>.</p>\r\n<p>&nbsp;</p>\r\n<p style=\"text-align: center;\"><strong>Interested in Joining?</strong></p>\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n<p>If you are interested in becoming a member or have any questions related to membership, please send an email to our Vice President of Membership at uc.apomembership@gmail.com or call/text them at (614) 867-7292.</p>\r\n<p>&nbsp;</p>\r\n<p style=\"text-align: center;\"><strong>Have Any Other Questions?</strong></p>\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n<p>If you have any other questions, please send us an email at <a href=\"mailto:uc.aphio@gmail.com\"> uc.aphio@gmail.com</a>, or call/text us at (513) 787-9781.</p>\r\n<p>&nbsp;</p>\r\n<p style=\"text-align: center;\"><strong>Useful Links</strong></p>\r\n<p>&nbsp;</p>\r\n<p style=\"text-align: center;\"><a href=\"https://www.apoonline.org/deltaalpha/index.php\" target=\"_blank\" rel=\"noopener\">Click here to visit our website.</a><br /><br /><span class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_fwb\"><a class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_profileLink\" href=\"https://www.facebook.com/APODeltaAlpha/?eid=ARAVQTOziSq89vLuStOPU3QDAk1hTLY3Cm-LRKA3xf4PwUN3NdUzfYbWtM4OI4pk1xsmedhQOWe-3MLd&amp;fref=tag\" target=\"_blank\" rel=\"noopener\">Click here to visit our Facebook page.</a></span><br /><br /><span class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_fwb\"><a href=\"https://twitter.com/UCDeltaAlpha?lang=en&amp;fbclid=IwAR0QLfP5PPK5rWvb3FGjaJV6c08zDQMv30w5LBjpNLaTP4VGL8SlTgKSRng\" target=\"_blank\" rel=\"nofollow noopener\">Click here to visit our Twitter feed.</a></span><br /><br /><span class=\"x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_fwb\"><a href=\"https://www.instagram.com/uc.aphio/?hl=en&amp;fbclid=IwAR3N4ZF-vFvTCExPlRSb42c4ukemQr7hq4DY3x5aHK78ULExU-x6XvQma6I\" target=\"_blank\" rel=\"nofollow noopener\">Click here to check out our instagram account.</a></span><br /><br /><br /></p>",
            "Summary": "Alpha Phi Omega is a co-ed, inclusive service fraternity with three cardinal principles: leadership, friendship, and service. Our roots lie in the Boy Scouts of America. UC's chapter, Delta Alpha, was established in 1942. Come and help us serve others.",
            "CategoryIds": [
                "10788",
                "10789"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "355416",
            "InstitutionId": 4412,
            "ParentOrganizationId": 200594,
            "BranchId": 200594,
            "Name": "Alpha Psi Lambda National, Inc.",
            "ShortName": "APsi",
            "WebsiteKey": "apsi",
            "ProfilePicture": "47e80762-4e9c-4f25-9ec5-b20a7b3c5ad4bcd28f63-c25a-4253-9de1-83f7ba8efced.png",
            "Description": "<p>Alpha Psi Lambda National, Inc. is a social co-ed Latinx interest Fraternity, open to all students. Our values are focused on leadership development, service to the community, academic success, cultural appreciation and advocacy.</p>",
            "Summary": "Alpha Psi Lambda National, Inc. is a social co-ed Latinx interest Fraternity, open to all students. Our values are focused on leadership development, service to the community, academic success, cultural appreciation and advocacy. ",
            "CategoryIds": [],
            "CategoryNames": [],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206703",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Alpha Rho Chi",
            "ShortName": "APX",
            "WebsiteKey": "alpha-rho-chi",
            "ProfilePicture": "79f5664e-4dfb-41e0-addd-fb3bed0c3f8be83cbd2e-5e20-47a1-a959-4a97d8e08ae1.jpg",
            "Description": "<p>APX is a professional fraternity for students of architecture and the allied arts. We strive to enhance the professional, academic, and social lives of members through a variety of professional and brotherhood events on the local and national scale.&nbsp;</p>",
            "Summary": "APX is a professional fraternity for students of architecture and the allied arts. We strive to enhance the professional, academic, and social lives of members through a variety of professional and brotherhood events on the local and national scale.",
            "CategoryIds": [
                "10788",
                "10789",
                "10790",
                "10797",
                "18937"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Creative & Performing Arts",
                "Professional",
                "DAAP Student Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "410962",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Association of Engineers of Indian Origin at the University of Cincinnati ",
            "ShortName": "AAEIO- UC ",
            "WebsiteKey": "aaeio",
            "ProfilePicture": "71098ab2-e038-4ea0-8385-f6093d9291c8a1e8f41d-315b-40c5-acd9-0fe76596ca5c.jpeg",
            "Description": "<p style=\"text-align: left;\">Purpose of the Organization<br />The purpose of AAEIO is to engage and bring together the engineering community of Indian origin at University of Cincinnati to develop a mentorship program for engineering students, and also to bring professionals, entrepreneurs, researchers, business owners, and academicians together for networking and scientific and professional development.</p>",
            "Summary": "AAEIO's mission is to foster excellence in engineering through professional development, mentorship, and cultural connectivity among students of Indian origin at the University of Cincinnati.",
            "CategoryIds": [
                "10795",
                "10797",
                "17192"
            ],
            "CategoryNames": [
                "Cultural",
                "Professional",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "354271",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Association of Psychiatric Pharmacists",
            "ShortName": "AAPP",
            "WebsiteKey": "aapp",
            "ProfilePicture": "d4c71773-4085-4512-920d-938c734ee9070a81f7b4-ada2-4e49-9e7b-19e085fdab11.jpeg",
            "Description": "<p>American Association of Psychiatric Pharmacy is the student chapter of the professional society whose focus is on advancing the practice and reach of neuropsychiatric pharmacists. The chapter promotes awareness of mental health and wellness.</p>",
            "Summary": "American Association of Psychiatric Pharmacy is the student chapter of the professional society whose focus is on advancing the practice and reach of neuropsychiatric pharmacists. The chapter promotes awareness of mental health and wellness.",
            "CategoryIds": [
                "10788",
                "10789",
                "10792",
                "10794",
                "10795",
                "10797",
                "10800",
                "14391"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Graduate",
                "LGTBQ+",
                "Cultural",
                "Professional",
                "Special Interest",
                "Health & Wellness"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206904",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Cancer Society on Campus at University of Cincinnati",
            "ShortName": "ACS on Campus",
            "WebsiteKey": "acs-on-campus",
            "ProfilePicture": "bd42a465-c2c8-4cf5-8773-860bce90e1cc3d69b0b2-c5cd-45d3-a804-ce0e60fb82d1.jpg",
            "Description": "<p>ACS on Campus is a nationwide collaboration of college students dedicated to eliminating cancer by working with the American Cancer Society. ACS has four Strategic Directions: Advocacy, Cancer Education, Relay For Life, and Survivorship.</p>",
            "Summary": "ACS on Campus is a nationwide collaboration of college students dedicated to eliminating cancer by working with the American Cancer Society. ACS has four Strategic Directions: Advocacy, Cancer Education, Relay For Life, and Survivorship.",
            "CategoryIds": [
                "10789"
            ],
            "CategoryNames": [
                "Community Service"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "358039",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Constitution Society",
            "ShortName": "ACS",
            "WebsiteKey": "americanconstitutionsociety",
            "ProfilePicture": "45bb4907-ec2a-4057-a220-0345915194edc75b5dd6-e3fd-425e-ada5-c8463cb1384e.png",
            "Description": "<p>The mission of the American Constitution Society is to harness values of compassion and respect for each individual, and to re-incorporate them into American law and politics, in order to build a stronger and more decent national community. We seek to restore the fundamental principles of respect for human dignity, protection of individual rights and liberties, genuine equality, and<br />access to justice to their rightful&mdash;and traditionally central&mdash;place in American law. We want to strengthen the intellectual underpinnings of&mdash;and the public case for&mdash;a vision of the law in which these values are paramount. Our goal is a rekindling of the hope that by reason and decency, we can create an America that is better for us all.</p>",
            "Summary": "ACS at UC Law is a chapter of the American Constitution Society for Law and Policy, the leading progressive legal organization with more than 200 student and lawyer chapters across the nation.",
            "CategoryIds": [
                "10792",
                "10796",
                "10797",
                "18597"
            ],
            "CategoryNames": [
                "Graduate",
                "Political & Activitist",
                "Professional",
                "College of Law"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206746",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Institute of Architecture Students",
            "ShortName": "AIAS or UC AIAS",
            "WebsiteKey": "aias",
            "ProfilePicture": "b6099f03-81d6-4464-9fc3-733ca70db0dba98614ad-119d-4d64-a5a9-9e6a6308bad9.png",
            "Description": "<p>The American Institute of Architecture Students aims to organize and unite it's fellowship. Through networking and recreational events, we hope to provide positive experiences to all architecture students.</p>",
            "Summary": "The American Institute of Architecture Students aims to organize and unite it's fellowship. Through networking and recreational events, we hope to provide positive experiences to all architecture students.",
            "CategoryIds": [
                "10788",
                "10790",
                "10797",
                "10798",
                "13804",
                "18937"
            ],
            "CategoryNames": [
                "Academic",
                "Creative & Performing Arts",
                "Professional",
                "Recreation",
                "Cohort Program",
                "DAAP Student Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206762",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Institute of Chemical Engineers (UC Student Chapter)",
            "ShortName": "UC AIChE",
            "WebsiteKey": "uc-aiche",
            "ProfilePicture": "0ec7f282-1bbc-49ba-bd0e-7da1e63b9068a120565e-ee3a-4043-a0b8-91fc4b9d1fbc.jpg",
            "Description": "<p>An organization for students to network with other chemical engineering students at UC. Meetings consist of fun and engaging activities, such as social events, professional speakers, philanthropy opportunities, underclassmen/upperclassmen mentorship program, and national conferences. We highly encourage student involvement and offer a variety of leadership positions to help our organization be successful. Join us at our biweekly meetings to learn more about the industry and grow as young professionals in a social atmosphere. Free food at every meeting!</p>",
            "Summary": "A group for chemical engineers to network with other chemical engineers in different class years and across the country. Meetings consist of a variety of activities including: social events, professional speakers and mentoring opportunites.",
            "CategoryIds": [
                "10797",
                "17192"
            ],
            "CategoryNames": [
                "Professional",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207007",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Marketing Association at University of Cincinnati",
            "ShortName": "AMA at UC",
            "WebsiteKey": "ucama",
            "ProfilePicture": "1d0ab868-233a-4205-aa17-557f5e14e68dc678345e-e9ad-4289-90ff-f6ed5075bd22.jpg",
            "Description": "<p>The AMA at UC serves to provide unparalleled membership value to Lindner College of Business students at the University of Cincinnati through;</p>\r\n<ul>\r\n<li>educational seminars</li>\r\n<li>professional skills development workshops</li>\r\n<li>networking opportunities</li>\r\n<li>case competitions</li>\r\n<li>community service initiatives</li>\r\n<li>real-world experience through our new AMA Agency&nbsp;&nbsp;</li>\r\n</ul>\r\n<p>The AMA at UC will give its members a competitive advantage when entering the workforce all while supporting the Cincinnati area and elevating the UC Carl H. Lindner College of Business.&nbsp;</p>",
            "Summary": "American Marketing Association at University of Cincinnati is a professional student organization that empowers students through information, education, and relationships that will enrich their professional development and careers.",
            "CategoryIds": [
                "10797",
                "16324"
            ],
            "CategoryNames": [
                "Professional",
                "Lindner Student Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207002",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Medical Student Association - Premedical Chapter",
            "ShortName": "AMSA",
            "WebsiteKey": "amsa-pre-medical-chapter",
            "ProfilePicture": "7f4377c8-5d15-43c3-bac5-a9dc0f0ff2b08b9925b1-6316-4402-8243-7b617132f26f.png",
            "Description": "<p>The purpose of AMSA shall be to provide pertinent information to students interested in medicine, to stimulate an appreciation of the importance of pre-medical education in the study of medicine, and to encourage excellence in pre-medical school. AMSA will also host training events for students to receive hands-on experience in preparation for medical school and various jobs within the healthcare field (MA, PCA, STNA, etc.).</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>Please join our&nbsp;Group me for more updates: <a href=\"https://groupme.com/join_group/109498124/zUGrmFGI\">https://groupme.com/join_group/103170933/Q4JquU54</a></p>",
            "Summary": "The purpose of AMSA shall be to stimulate an appreciation of the importance of pre-medical education in the study of medicine, to assist students in their undergraduate studies, and to provide hands-on training in preparation for a career in medicine.",
            "CategoryIds": [
                "10788",
                "10789",
                "10797",
                "14391"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Professional",
                "Health & Wellness"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "354269",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Pharmacists Association",
            "ShortName": null,
            "WebsiteKey": "pharmacistsassociation",
            "ProfilePicture": null,
            "Description": null,
            "Summary": "APhA is an organization that looks for all opportunities of pharmacy for our student pharmacists. We make sure that all areas of pharmacy are shown throughout our organization. We also allow our students to network with other colleges at conferences. ",
            "CategoryIds": [
                "10788",
                "10797"
            ],
            "CategoryNames": [
                "Academic",
                "Professional"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206799",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Sign Language Club",
            "ShortName": "ASL Club",
            "WebsiteKey": "american-sign-language-club",
            "ProfilePicture": "cd47d22c-e4c0-4eb4-979e-f65ad9d0cefdbc2ed143-730b-4749-85ac-fb8f52d84271.jpg",
            "Description": "<p><span style=\"font-weight: 400;\">**New Club Members please fill out the&nbsp;<a href=\"https://docs.google.com/forms/d/10YPOqk2rGHi63Ox-zRNHWn7CiPfyV5oF7yda4xzfi5U/edit\">New Member Information</a> form!</span></p>\r\n<p>&nbsp;</p>\r\n<p><span style=\"font-weight: 400;\">**ALL members please fill out the&nbsp;<a href=\"https://docs.google.com/forms/d/1bEHO5jHXLlDQErkd4GHqmWeiuYhdyS4e5NT1hdEK8d0/edit\">ASL Club Social Event Interest</a> interest form!</span></p>\r\n<p>&nbsp;</p>\r\n<p><span style=\"font-weight: 400;\">Join the&nbsp;<a href=\"https://groupme.com/join_group/106128081/tILzQrHt\">ASL Club GroupMe</a>!</span></p>\r\n<p>&nbsp;</p>\r\n<p><span style=\"font-weight: 400;\">Fill out the&nbsp;<a href=\"https://docs.google.com/forms/d/1zxpgeSP-l9m_5NCVCJ1cC7Nxx4fVOxy5bvOU1KvK5XE/edit\">Request an Interpreter</a> form to request an interpreter for an ASL Club event!</span></p>\r\n<p>&nbsp;</p>\r\n<p><span style=\"font-weight: 400;\">The UC ASL Club is a safe and friendly organization for students to learn about American Sign Language and the Deaf Community. Involvement in the UC ASL Club will help improve students&rsquo; signing skills and knowledge about Deaf culture. We do this by getting involved with the Deaf community on and off campus through volunteering our time, attending and sponsoring signing-friendly events, and increasing knowledge and exposure to the local Deaf community. This club is for anyone with an interest in ASL or the Deaf Community whether you are D/deaf, Hard of Hearing, or Hearing. Interpreters can be requested using the following formThis club is for students of all skill levels meaning, students with no knowledge of ASL are more than welcome. </span></p>\r\n<p>&nbsp;</p>\r\n<p><em>**The University of Cincinnati does not discriminate on the basis of disability, race, color, religion, except for religious qualifications which may be required by organizations whose aims are primarily sectarian, national origin, ancestry, medical condition, genetic information, marital status, parental status (including status as a foster parent), sex, age, sexual orientation, military status (past, present, or future), or gender identity and expression in its programs and activities.</em></p>",
            "Summary": "The UC ASL Club is a safe and friendly organization for students to practice American Sign Language. This club is for anyone interested whether you are D/deaf, Hard of Hearing, or Hearing. Interpreters can be requested.",
            "CategoryIds": [
                "10788",
                "10795",
                "10800"
            ],
            "CategoryNames": [
                "Academic",
                "Cultural",
                "Special Interest"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206825",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Society of Civil Engineers",
            "ShortName": "ASCE",
            "WebsiteKey": "american-society-of-civil-engineers",
            "ProfilePicture": "a711e4ee-05b8-442c-8752-700bf6c887ba7a32d440-7a06-4d7e-93a4-7c8cda330d09.png",
            "Description": "<p>The University of Cincinnati brings the national ASCE organization to the campus.&nbsp;Deliver value to our members, advance civil engineering, and protect the public health,<br />safety, and welfare.</p>",
            "Summary": "The University of Cincinnati brings the national ASCE organization to the campus.",
            "CategoryIds": [
                "10788",
                "10797",
                "10798",
                "17192"
            ],
            "CategoryNames": [
                "Academic",
                "Professional",
                "Recreation",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "354268",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Society of Consultant Pharmacists",
            "ShortName": "ASCP",
            "WebsiteKey": "ascp",
            "ProfilePicture": "e2c07f27-0a59-4527-86de-c2d6b541f94fc0453033-792c-4759-a89e-8230f58c0d85.png",
            "Description": null,
            "Summary": "ASCP focuses on the realm of pharmacy within long term care and consultant pharmacy in order to provide patient centered care to the geriatric population.",
            "CategoryIds": [
                "10789",
                "10792",
                "10797"
            ],
            "CategoryNames": [
                "Community Service",
                "Graduate",
                "Professional"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "293901",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
            "ShortName": "ASHRAE",
            "WebsiteKey": "ashrae",
            "ProfilePicture": "1a36616f-df91-4d47-b2e1-bfdbcef6abef9665321e-c064-4825-88ae-6845c1cd6091.png",
            "Description": "<p><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">The specific purpose of </span> <span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">ASHRAE</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\"> shall be to uphold the </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">objectives</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\"> of </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">local ASHRAE</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\"> chapters</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\"> in promoting and </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">disseminating</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\"> knowledge </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">regarding</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\"> the profession of </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">HVAC&amp;R industry</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">. This shall be achieved through organized efforts in study, research, and discussion of the entire field of </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">HVAC&amp;R and </span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">building sustainability</span><span class=\"x_NormalTextRun x_SCXW216824464 x_BCX0\">. </span><span class=\"x_NormalTextRun x_AdvancedProofingIssueV2Themed x_SCXW216824464 x_BCX0\">ASHRAE</span><span class=\"x_NormalTextRun x_AdvancedProofingIssueV2Themed x_SCXW216824464 x_BCX0\"> shall also encourage the interaction of students to share their education and experiences within </span><span class=\"x_NormalTextRun x_AdvancedProofingIssueV2Themed x_SCXW216824464 x_BCX0\">all engineering fields </span><span class=\"x_NormalTextRun x_AdvancedProofingIssueV2Themed x_SCXW216824464 x_BCX0\">and provide a valuable means of communication between students and professionals in the field.</span></p>\r\n<p>Activities involve: Competitions, conferences, guest lectures, case studies, general body meetings, and career help.</p>",
            "Summary": "ASHRAE is a student organization focused on getting more students interested, concerned, and\r\ninvolved in the field of heating, ventilating, refrigeration, and air-conditioning with emphasis on how a building can be sustainable and net zero energy.",
            "CategoryIds": [
                "10788",
                "10797",
                "10800",
                "17192"
            ],
            "CategoryNames": [
                "Academic",
                "Professional",
                "Special Interest",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206837",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "American Society of Mechanical Engineers",
            "ShortName": "ASME",
            "WebsiteKey": "american-society-of-mechanical-engineers",
            "ProfilePicture": "5c151f47-d4b1-40c9-8b1b-02936599f975c42d26ba-01be-40a7-90ff-b8ebd27e6909.jpg",
            "Description": "<p>The UC chapter of the American Society of Mechanical Engineers (ASME) serves as a link between engineering students and professional engineers through speaker and networking events. ASME also hosts engineering challenge events to help connect students to each other.</p>\r\n<p>All students are welcome to join. Follow the page to stay updated for future events.</p>",
            "Summary": "The UC chapter of the American Society of Mechanical Engineers (ASME) serves as a link between engineering students and professional engineers through speaker and networking events. ASME also hosts engineering challenge events to help connect students ...",
            "CategoryIds": [
                "10788",
                "10789",
                "10797",
                "17192"
            ],
            "CategoryNames": [
                "Academic",
                "Community Service",
                "Professional",
                "CEAS Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "304011",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Animation Club",
            "ShortName": "UC Animation",
            "WebsiteKey": "ucanimation",
            "ProfilePicture": "64feab95-08a1-43b1-b69e-c9244947592412bb7883-dce9-46b7-a400-65a1178b570a.png",
            "Description": "<p>The goal of UC's Animation Club is to create, study, and appreciate various types of animation as well as learn about the animation industry in a very fun and supportive environment. This club is for all UC students regardless if they are studying animation at UC or simply appreciate animation as an art form.</p>",
            "Summary": "The goal of UC's Animation Club is to create, study, and appreciate various types of animation as well as learn about the animation industry in a very fun and supportive environment.",
            "CategoryIds": [
                "10788",
                "10790",
                "10800",
                "18937"
            ],
            "CategoryNames": [
                "Academic",
                "Creative & Performing Arts",
                "Special Interest",
                "DAAP Student Organizations"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206863",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Anthropology Graduate Student Association",
            "ShortName": "AGSA",
            "WebsiteKey": "anthropology-graduate-student-association",
            "ProfilePicture": "c627e52a-7587-4ed9-a047-c59ae921c2495286ca6c-93d9-413e-ba7f-67558d00a662.jpg",
            "Description": "<p>The AGSA aids and serves the Graduate Students of the UC Department of Anthropology.</p>",
            "Summary": "The AGSA aids and serves the Graduate Students of the UC Department of Anthropology.",
            "CategoryIds": [
                "10788",
                "10792",
                "10795",
                "10797"
            ],
            "CategoryNames": [
                "Academic",
                "Graduate",
                "Cultural",
                "Professional"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "206883",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Anthropos at UC",
            "ShortName": "Anthropos",
            "WebsiteKey": "anthropos",
            "ProfilePicture": "c77a3752-0d54-4b18-8265-3086f5999ecb169eeaf8-4e90-46b3-a3b1-8ec2530ba7ad.png",
            "Description": "<p>An organization with the goal of creating a discourse regarding all anthropological fields among undergraduate and graduate students at UC.</p>",
            "Summary": "An organization with the goal of creating a discourse regarding all anthropological fields among undergraduate students at UC. All students are welcome.",
            "CategoryIds": [
                "10788"
            ],
            "CategoryNames": [
                "Academic"
            ],
            "Status": "Active",
            "Visibility": "Public"
        },
        {
            "@search.score": 1.0,
            "Id": "207113",
            "InstitutionId": 4412,
            "ParentOrganizationId": 169800,
            "BranchId": 169800,
            "Name": "Arab Student Association ",
            "ShortName": "ASA",
            "WebsiteKey": "arabstudentassociation",
            "ProfilePicture": "394c3e16-3327-43e9-ae3b-fbdf7be78a89f917cf63-ee05-4da3-ba4d-100b3b6f7666.JPG",
            "Description": "<p>The purpose of the Arab Student Association at UC is to bring together students of Arab origin and Arab cultural heritage together as well as students who are generally interested in Arab culture. We welcome all regardless of religious, ethnic, or national background. We hope to spread awareness about issues in the Arab world as well as celebrate our diverse culture that encompasses countries across the Middle East and North Africa.&nbsp;</p>\r\n<p>Follow us on Instagram @asa.uc for the newest updates.</p>",
            "Summary": "The purpose of the Arab Student Association at UC is to bring together students of Arab origin and Arab cultural heritage together as well as students who are generally interested in Arab culture. ",
            "CategoryIds": [
                "10795",
                "10800"
            ],
            "CategoryNames": [
                "Cultural",
                "Special Interest"
            ],
            "Status": "Active",
            "Visibility": "Public"
        }
    ]
    return (
        <SafeAreaView className='bg-white dark:bg-gray-900 flex-1'>
            <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={isDark ? '#111827' : '#fff'} />

            <View className=' bg-white dark:bg-gray-900 flex-row items-center px-4 py-3'>
                <TouchableOpacity
                    onPress={() => router.back?.()}
                    className="w-10 h-10 items-center justify-center"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Icon name="chevron-back" type="ionicon" color={isDark ? '#fff' : undefined} />
                </TouchableOpacity>

                <AppText weight='bold' className="flex-1 text-center font-bold text-2xl dark:text-white">All Organizations</AppText>

                <TouchableOpacity
                    // onPress={() => router.back?.()}
                    className="w-10 h-10 items-center justify-center"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Icon name="dots-three-vertical" type="entypo" color={isDark ? '#fff' : undefined} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className='rounded-3xl mx-5 flex-row items-center px-3 gap-x-3' style={{ height: 50, backgroundColor: isDark ? '#374151' : GRAY_BG }}>
                    <Icon name='search' type='feather' color={isDark ? '#9CA3AF' : undefined} />
                    <TextInput style={{ height: '100%', width: '85%', color: isDark ? '#F9FAFB' : undefined }} placeholderTextColor={isDark ? '#9CA3AF' : '#6B6A6A'} placeholder='search organizations...' />
                </View>

                <View className='px-5 mt-10'>
                    {/* // @ts-ignore */}
                    {allOrgs.map((org: any) => (
                        <View key={org.Id} className='mb-6'>
                            <OrganizationCard
                                orgId={org.Id}
                                orgName={org.Name}
                                orgProfilePicture={org.ProfilePicture}
                                orgCategories = {org.CategoryNames}
                                orgFollowers='10.1K followers' />
                        </View>
                    ))}

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default AllOrganizations