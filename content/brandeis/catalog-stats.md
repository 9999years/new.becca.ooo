+++
title="Brandeis Course Catalog Statistics"
description=""
css=["google-charts"]
js=["https://www.gstatic.com/charts/loader.js", "brandeis/catalog-stats"]
no_default_includes=true
+++

I recently scraped the entire [Brandeis digital course catalog][catalog]. Grab
the data for yourself on [GitHub][catalog-repo] (it’s 30MB of JSON, 1.6MB
zipped, available as a `.tar.xz` or a `.zip`) along with some usage
instructions.

So what to do with 30MB of course data? Make charts of course! All charts on
this page are interactive — try mousing over or clicking them!

<div id="courses_per_semester"></div>

Courses offered has increased by about 13% between Spring 2005 and Fall 2018.

<div id="stacked_subject_courses_per_semester"></div>

For readability, only subjects with >1,000 courses offered (cumulative total)
are shown. (BUS, with 999 courses listed, was a close contender, but not a very
interesting plot.) If you’re curious about a specific subject, try the
interactive charts below:

<select id="subject_chooser">
  <option>AAAS</option>
  <option>AAAS/ENG</option>
  <option>AAAS/FA</option>
  <option>AAAS/WGS</option>
  <option>AAPI</option>
  <option>AMST</option>
  <option>AMST/ANT</option>
  <option>AMST/ENG</option>
  <option>AMST/MUS</option>
  <option>AMST/SOC</option>
  <option>ANTH</option>
  <option>ANTH/ENG</option>
  <option>ANTH/NEJ</option>
  <option>ARBC</option>
  <option>BCBP</option>
  <option>BCHM</option>
  <option>BCSC</option>
  <option>BIBC</option>
  <option>BIOL</option>
  <option>BIOP</option>
  <option>BIOT</option>
  <option>BIPH</option>
  <option>BISC</option>
  <option>BUS</option>
  <option>BUS/ECON</option>
  <option>BUS/FIN</option>
  <option>CA</option>
  <option>CAST</option>
  <option>CBIO</option>
  <option>CHEM</option>
  <option>CHIN</option>
  <option>CHSC</option>
  <option>CLAS</option>
  <option>CLAS/FA</option>
  <option>CLAS/THA</option>
  <option>COEX</option>
  <option>COMH</option>
  <option>COML</option>
  <option>COML/ENG</option>
  <option>COML/HOI</option>
  <option>COML/HUM</option>
  <option>COML/THA</option>
  <option>COMP</option>
  <option>CONT</option>
  <option>COSI</option>
  <option>CP</option>
  <option>EAS</option>
  <option>EBIO</option>
  <option>ECON</option>
  <option>ECON/FA</option>
  <option>ECON/FIN</option>
  <option>ECON/HIS</option>
  <option>ECS</option>
  <option>ECS/ENG</option>
  <option>ED</option>
  <option>EL</option>
  <option>ENG</option>
  <option>ENG/HIST</option>
  <option>ENVS</option>
  <option>ENVS/THA</option>
  <option>ESL</option>
  <option>FA</option>
  <option>FA/NEJS</option>
  <option>FA/RECS</option>
  <option>FECS</option>
  <option>FILM</option>
  <option>FIN</option>
  <option>FREN</option>
  <option>FYS</option>
  <option>GECS</option>
  <option>GER</option>
  <option>GRK</option>
  <option>GS</option>
  <option>GSAS</option>
  <option>HBRW</option>
  <option>HECS</option>
  <option>HINDI</option>
  <option>HISP</option>
  <option>HIST</option>
  <option>HIST/SOC</option>
  <option>HOID</option>
  <option>HRNS</option>
  <option>HRNS/HS</option>
  <option>HRNS/NEJ</option>
  <option>HS</option>
  <option>HSSP</option>
  <option>HUM</option>
  <option>HUM/UWS</option>
  <option>IECS</option>
  <option>IGS</option>
  <option>IGS/LGLS</option>
  <option>IGS/SAS</option>
  <option>IMES</option>
  <option>INT</option>
  <option>ITAL</option>
  <option>JAPN</option>
  <option>JCS</option>
  <option>JOUR</option>
  <option>KOR</option>
  <option>LALS</option>
  <option>LAS</option>
  <option>LAT</option>
  <option>LGLS</option>
  <option>LGLS/POL</option>
  <option>LING</option>
  <option>MATH</option>
  <option>MUS</option>
  <option>NBIO</option>
  <option>NEJS</option>
  <option>NEJS/SOC</option>
  <option>NPHY</option>
  <option>NPSY</option>
  <option>PAX</option>
  <option>PE</option>
  <option>PHIL</option>
  <option>PHSC</option>
  <option>PHYS</option>
  <option>PMED</option>
  <option>POL</option>
  <option>PORT</option>
  <option>PSYC</option>
  <option>QBIO</option>
  <option>RECS</option>
  <option>RECS/THA</option>
  <option>REL</option>
  <option>REL/SAS</option>
  <option>RUS</option>
  <option>SAL</option>
  <option>SAS</option>
  <option>SECS</option>
  <option>SJSP</option>
  <option>SOC</option>
  <option>SPAN</option>
  <option>SQS</option>
  <option>SYS</option>
  <option>THA</option>
  <option>USEM</option>
  <option>UWS</option>
  <option>WMGS</option>
  <option>WMNS</option>
  <option>YDSH</option>
</select>
<div id="subject_courses_per_semester"></div>

<div id="corr_subject_courses_per_semester"></div>

{{% rule %}}

<div id="course_enrollments"></div>

If a student is taking 4 courses in a semester, they have 4 course-enrollments;
as such, this number is 4–5× the student body. Interestingly, we see a regular
≈5% dip between the Fall and Spring semesters.

Brandeis is [proud of its 10:1 student-to-faculty ratio][stf-ratio], but how
does that hold up? The average university-wide all-time class size is 22
students enrolled, but class size varies wildly by subject. In the chart below,
only courses with a class size ≥35 or ≤10 are shown.

<div id="students_per_subject"></div>

Two outliers, CONT and PHSC, are not shown.

The subject with the highest average-class-size is CONT, with 65 students per
course. CONT is a placeholder subject; one course, CONT 300B, is taught per
year (“Responsible Conduct of Science”, named “Ethical Practice in
Health-Related Sciences” before 2013) in the Spring semester. Class sizes
before 2011 were around 30, but have consistently been around 100 from 2012 on.
Unsurprisingly, a syllabus informs us that the course “is  required  for all
Division of  Science  doctoral  students  and postdoctoral fellows.”

The second-highest class-size subject, PHSC, with 54 students per class, has a
similar story: one course, PHSC 2B “Introductory Astronomy,” is offered once
every two years in the Fall semester. Enrollment is packed, and astronomy is
nearly always entirely filled.

Past that, things start to look pretty normal. IGS is international / global
studies and REL is religious studies. I have no further explanations to offer.

On the other end, things look pretty similar — for different reasons. INT, the
smallest subject by class size, has a measly 3.7 students per class. INT holds
one course, Academic Year Internship, which usually gets an enrollment of 1–5.

Similarly, BCBP 300A “Introduction to Research in Biochemistry and Biophysics
I” is a required course for the biochemistry / biophysics Ph.D with an
enrollment that’s often zero, a rarity!

The full table is shown below, alphabetized.

Subject  | Size
---------|-------------------
AAAS     | 20.62
HIST     | 25.56
ANTH     | 27.50
ARBC     | 11.44
AAPI     | 16.66
BCHM     | 29.09
BIOL     | 34.04
BUS      | 31.04
CHEM     | 31.29
CHIN     | 17.39
CLAS     | 25.63
COMP     | 10.50
COSI     | 38.06
ECON     | 38.02
ED       | 9.497
ESL      | 11.60
ENVS     | 23.12
PHIL     | 27.58
EL       | 12.78
ENG      | 20.46
FA       | 18.46
FYS      | 11.77
FREN     | 14.92
GER      | 11.93
HS       | 21.32
GRK      | 7.815
HBRW     | 13.69
HISP     | 16.43
HRNS     | 10.98
HUM      | 25.92
POL      | 24.80
FIN      | 34.39
INT      | 3.7
IMES     | 30.45
ITAL     | 13.88
JAPN     | 15.03
JOUR     | 19.0
KOR      | 15.86
LING     | 21.13
LAT      | 13.09
LGLS     | 34.75
MATH     | 19.83
MUS      | 10.32
NEJS     | 12.69
PE       | 15.37
PHYS     | 25.67
PSYC     | 39.41
RUS      | 10.97
HIST/SOC | 10.33
SOC      | 28.82
SAS      | 17.4
THA      | 10.75
UWS      | 16.43
WMGS     | 21.76
YDSH     | 8.239
AMST     | 30.23
BCBP     | 4.3
BCSC     | 22.8
BIBC     | 22.0
BIOP     | 5.714
BIOT     | 11.76
BIPH     | 7.25
BISC     | 31.16
CA       | 35.0
CAST     | 15.28
CBIO     | 25.90
CHSC     | 29.55
COEX     | 15.57
COMH     | 5.333
COML     | 14.95
CONT     | 65.5
CP       | 13.0
EAS      | 14.25
EBIO     | 17.5
ECS      | 15.89
FECS     | 17.33
FILM     | 36.05
GECS     | 19.03
GS       | 8.833
GSAS     | 5.0
HECS     | 12.0
HINDI    | 5.5
HOID     | 20.0
HSSP     | 24.84
IECS     | 16.0
IGS      | 52.07
JCS      | 10.24
LALS     | 13.0
LAS      | 23.0
NBIO     | 30.11
NPHY     | 15.0
NPSY     | 40.15
PAX      | 19.32
PHSC     | 54.27
PMED     | 5.846
PORT     | 8.666
QBIO     | 12.56
RECS     | 9.195
REL      | 46.64
SAL      | 16.4
SECS     | 6.0
SJSP     | 9.538
SPAN     | 16.25
SQS      | 16.71
SYS      | 12.0
USEM     | 16.12
WMNS     | 17.42

[catalog]: http://registrar-prod.unet.brandeis.edu/registrar/schedule/classes/2018/Fall/100/UGRD
[catalog-repo]: https://github.com/9999years/brandeis-course-data
[stf-ratio]: http://www.brandeis.edu/about/facts/index.html
