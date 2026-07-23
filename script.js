/* ------------------------
   HYD CITY BUS DASHBOARD
-------------------------*/

:root{

--primary:#1976d2;
--secondary:#42a5f5;

--bg:#f4f6f9;
--card:#ffffff;
--text:#222;

--shadow:0 8px 20px rgba(0,0,0,.08);

}

body.dark{

--bg:#101418;
--card:#1b222c;
--text:#f2f2f2;

}

*{

margin:0;
padding:0;
box-sizing:border-box;

font-family:
Segoe UI,
Arial,
sans-serif;

}

body{

background:var(--bg);
color:var(--text);

transition:.35s;

}

/* HEADER */

header{

height:70px;

padding:15px 30px;

display:flex;
justify-content:space-between;
align-items:center;

background:var(--primary);

color:white;

box-shadow:var(--shadow);

}

header h1{

font-size:28px;

}

#themeToggle{

padding:10px 20px;

border:none;

border-radius:8px;

cursor:pointer;

background:white;

font-size:18px;

}

/* DASHBOARD CARDS */

.cards{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));

gap:20px;

padding:20px;

}

.card{

background:var(--card);

padding:25px;

border-radius:16px;

box-shadow:var(--shadow);

text-align:center;

transition:.3s;

}

.card:hover{

transform:translateY(-6px);

}

.card h2{

font-size:18px;

margin-bottom:15px;

}

.card h1{

font-size:42px;

color:var(--primary);

}

/* FILTERS */

#filters{

display:flex;

gap:15px;

padding:20px;

flex-wrap:wrap;

}

#filters select,
#filters input{

padding:12px;

border-radius:10px;

border:1px solid #ccc;

background:var(--card);

color:var(--text);

min-width:220px;

}

/* MAP */

#map{

height:550px;

margin:20px;

border-radius:18px;

overflow:hidden;

box-shadow:var(--shadow);

}

/* CHARTS */

.graphs{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(450px,1fr));

gap:25px;

padding:20px;

}

.chartCard{

background:var(--card);

padding:25px;

border-radius:18px;

box-shadow:var(--shadow);

}

/* TABLE */

.tableSection{

padding:20px;

}

table{

width:100%;

background:var(--card);

}

/* Leaflet popup */

.leaflet-popup-content{

font-size:14px;

}

/* Scrollbar */

::-webkit-scrollbar{

width:8px;

}

::-webkit-scrollbar-thumb{

background:#999;

border-radius:20px;

}

/* Mobile */

@media(max-width:900px){

header{

flex-direction:column;

height:auto;

padding:15px;

}

header h1{

font-size:22px;

margin-bottom:10px;

}

#map{

height:420px;

}

.graphs{

grid-template-columns:1fr;

}

.cards{

grid-template-columns:1fr;

}

}

/* Nice Fade Animation */

.card,
.chartCard,
#map{

animation:fade .6s ease;

}

@keyframes fade{

from{

opacity:0;
transform:translateY(20px);

}

to{

opacity:1;
transform:translateY(0);

}

}
