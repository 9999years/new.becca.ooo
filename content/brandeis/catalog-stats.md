+++
title="Brandeis Course Catalog Statistics"
description="An analysis of 13 years of Brandeis course catalogs"
css=["google-charts", "brandeis/catalog-stats"]
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

HS (history) and THA (theater arts) lead with MUS (musical studies) overtaking
theater in about 2011 — perhaps due in part to [the 2010 closing of Brandeis’
graduate theater school][tha-closing].

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
only subjects with an average class size ≥35 or ≤10 are shown.

<div id="students_per_subject"></div>

<details><summary>The full students-per-class by subject table, alphabetized.</summary>

<table class="subjects-table">
<tr><th>Subject  </th><th> Size  </th></tr>
<tr><td>AAAS     </td><td> 20.62 </td></tr>
<tr><td>HIST     </td><td> 25.56 </td></tr>
<tr><td>ANTH     </td><td> 27.50 </td></tr>
<tr><td>ARBC     </td><td> 11.44 </td></tr>
<tr><td>AAPI     </td><td> 16.66 </td></tr>
<tr><td>BCHM     </td><td> 29.09 </td></tr>
<tr><td>BIOL     </td><td> 34.04 </td></tr>
<tr><td>BUS      </td><td> 31.04 </td></tr>
<tr><td>CHEM     </td><td> 31.29 </td></tr>
<tr><td>CHIN     </td><td> 17.39 </td></tr>
<tr><td>CLAS     </td><td> 25.63 </td></tr>
<tr><td>COMP     </td><td> 10.50 </td></tr>
<tr><td>COSI     </td><td> 38.06 </td></tr>
<tr><td>ECON     </td><td> 38.02 </td></tr>
<tr><td>ED       </td><td> 9.97 </td></tr>
<tr><td>ESL      </td><td> 11.60 </td></tr>
<tr><td>ENVS     </td><td> 23.12 </td></tr>
<tr><td>PHIL     </td><td> 27.58 </td></tr>
<tr><td>EL       </td><td> 12.78 </td></tr>
<tr><td>ENG      </td><td> 20.46 </td></tr>
<tr><td>FA       </td><td> 18.46 </td></tr>
<tr><td>FYS      </td><td> 11.77 </td></tr>
<tr><td>FREN     </td><td> 14.92 </td></tr>
<tr><td>GER      </td><td> 11.93 </td></tr>
<tr><td>HS       </td><td> 21.32 </td></tr>
<tr><td>GRK      </td><td> 7.15 </td></tr>
<tr><td>HBRW     </td><td> 13.69 </td></tr>
<tr><td>HISP     </td><td> 16.43 </td></tr>
<tr><td>HRNS     </td><td> 10.98 </td></tr>
<tr><td>HUM      </td><td> 25.92 </td></tr>
<tr><td>POL      </td><td> 24.80 </td></tr>
<tr><td>FIN      </td><td> 34.39 </td></tr>
<tr><td>INT      </td><td> 3.70  </td></tr>
<tr><td>IMES     </td><td> 30.45 </td></tr>
<tr><td>ITAL     </td><td> 13.88 </td></tr>
<tr><td>JAPN     </td><td> 15.03 </td></tr>
<tr><td>JOUR     </td><td> 19.00 </td></tr>
<tr><td>KOR      </td><td> 15.86 </td></tr>
<tr><td>LING     </td><td> 21.13 </td></tr>
<tr><td>LAT      </td><td> 13.09 </td></tr>
<tr><td>LGLS     </td><td> 34.75 </td></tr>
<tr><td>MATH     </td><td> 19.83 </td></tr>
<tr><td>MUS      </td><td> 10.32 </td></tr>
<tr><td>NEJS     </td><td> 12.69 </td></tr>
<tr><td>PE       </td><td> 15.37 </td></tr>
<tr><td>PHYS     </td><td> 25.67 </td></tr>
<tr><td>PSYC     </td><td> 39.41 </td></tr>
<tr><td>RUS      </td><td> 10.97 </td></tr>
<tr><td>HIST/SOC </td><td> 10.33 </td></tr>
<tr><td>SOC      </td><td> 28.82 </td></tr>
<tr><td>SAS      </td><td> 17.40 </td></tr>
<tr><td>THA      </td><td> 10.75 </td></tr>
<tr><td>UWS      </td><td> 16.43 </td></tr>
<tr><td>WMGS     </td><td> 21.76 </td></tr>
<tr><td>YDSH     </td><td> 8.39 </td></tr>
<tr><td>AMST     </td><td> 30.23 </td></tr>
<tr><td>BCBP     </td><td> 4.30  </td></tr>
<tr><td>BCSC     </td><td> 22.80 </td></tr>
<tr><td>BIBC     </td><td> 22.00 </td></tr>
<tr><td>BIOP     </td><td> 5.14 </td></tr>
<tr><td>BIOT     </td><td> 11.76 </td></tr>
<tr><td>BIPH     </td><td> 7.25  </td></tr>
<tr><td>BISC     </td><td> 31.16 </td></tr>
<tr><td>CA       </td><td> 35.00 </td></tr>
<tr><td>CAST     </td><td> 15.28 </td></tr>
<tr><td>CBIO     </td><td> 25.90 </td></tr>
<tr><td>CHSC     </td><td> 29.55 </td></tr>
<tr><td>COEX     </td><td> 15.57 </td></tr>
<tr><td>COMH     </td><td> 5.33 </td></tr>
<tr><td>COML     </td><td> 14.95 </td></tr>
<tr><td>CONT     </td><td> 65.50 </td></tr>
<tr><td>CP       </td><td> 13.00 </td></tr>
<tr><td>EAS      </td><td> 14.25 </td></tr>
<tr><td>EBIO     </td><td> 17.50 </td></tr>
<tr><td>ECS      </td><td> 15.89 </td></tr>
<tr><td>FECS     </td><td> 17.33 </td></tr>
<tr><td>FILM     </td><td> 36.05 </td></tr>
<tr><td>GECS     </td><td> 19.03 </td></tr>
<tr><td>GS       </td><td> 8.33 </td></tr>
<tr><td>GSAS     </td><td> 5.00  </td></tr>
<tr><td>HECS     </td><td> 12.00 </td></tr>
<tr><td>HINDI    </td><td> 5.50  </td></tr>
<tr><td>HOID     </td><td> 20.00 </td></tr>
<tr><td>HSSP     </td><td> 24.84 </td></tr>
<tr><td>IECS     </td><td> 16.00 </td></tr>
<tr><td>IGS      </td><td> 52.07 </td></tr>
<tr><td>JCS      </td><td> 10.24 </td></tr>
<tr><td>LALS     </td><td> 13.00 </td></tr>
<tr><td>LAS      </td><td> 23.00 </td></tr>
<tr><td>NBIO     </td><td> 30.11 </td></tr>
<tr><td>NPHY     </td><td> 15.00 </td></tr>
<tr><td>NPSY     </td><td> 40.15 </td></tr>
<tr><td>PAX      </td><td> 19.32 </td></tr>
<tr><td>PHSC     </td><td> 54.27 </td></tr>
<tr><td>PMED     </td><td> 5.46 </td></tr>
<tr><td>PORT     </td><td> 8.66 </td></tr>
<tr><td>QBIO     </td><td> 12.56 </td></tr>
<tr><td>RECS     </td><td> 9.95 </td></tr>
<tr><td>REL      </td><td> 46.64 </td></tr>
<tr><td>SAL      </td><td> 16.40 </td></tr>
<tr><td>SECS     </td><td> 6.00  </td></tr>
<tr><td>SJSP     </td><td> 9.38 </td></tr>
<tr><td>SPAN     </td><td> 16.25 </td></tr>
<tr><td>SQS      </td><td> 16.71 </td></tr>
<tr><td>SYS      </td><td> 12.00 </td></tr>
<tr><td>USEM     </td><td> 16.12 </td></tr>
<tr><td>WMNS     </td><td> 17.42 </td></tr>
</table>
</details>

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
I” is a required course for the biochemistry / biophysics Ph.D!

[catalog]: http://registrar-prod.unet.brandeis.edu/registrar/schedule/classes/2018/Fall/100/UGRD
[catalog-repo]: https://github.com/9999years/brandeis-course-data
[stf-ratio]: http://www.brandeis.edu/about/facts/index.html
[tha-closing]: http://www.wbur.org/news/2010/02/24/brandeis-cuts
