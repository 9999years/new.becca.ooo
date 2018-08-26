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

[catalog]: http://registrar-prod.unet.brandeis.edu/registrar/schedule/classes/2018/Fall/100/UGRD
[catalog-repo]: https://github.com/9999years/brandeis-course-data
