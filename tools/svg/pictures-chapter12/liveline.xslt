<?xml version="1.0" encoding="ISO-8859-1"?>

<!-- ====================================================================== -->
<!-- Generate a line graph 					                                -->
<!-- ====================================================================== -->

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes"
              version="1.0"
              encoding="ISO-8859-1" />

<xsl:param name="width" select="'500'"/>
<xsl:param name="height" select="'500'"/>
<xsl:param name="year" select="'2002'"/>

<xsl:template match="pond">
  <svg
    width="{$width}"
    height="{$height}"
    xml:space="preserve"
    onload="Init(evt);"
    viewBox="0 0 150 150">

<script>
<xsl:comment>
<![CDATA[

var targetNode = null;
var SVGDoc=null;
var L1=null;
var count=0;
x=100
y=100
xt1=0
yt1=0
xt2=30
yt2=1000
width=600
height=300

function DisplayTime()
{
	var svgElement;
	var CurTime = new Date();
	var strTime;
	var temp;

	///////////////  Format Date & Time  ////////////////
	temp = CurTime.getMonth()+1;
	strTime="";
	if(!(temp>9)) strTime="0";
	strTime += CurTime.getMonth()+1;
	strTime += "/"
	
	temp = CurTime.getDate();
	if(!(temp>9)) strTime+="0";
	strTime += CurTime.getDate()+"/"+CurTime.getFullYear().toString().substr(2,4)+"  ";
	
	temp = CurTime.getHours();
	if(!(temp>9)) strTime+="0";
	strTime += CurTime.getHours()+":";
	
	temp = CurTime.getMinutes();
	if(!(temp>9)) strTime+="0";
	strTime += CurTime.getMinutes()+":";
	
	temp = CurTime.getSeconds();
	if(!(temp>9)) strTime+="0";
	strTime += CurTime.getSeconds();
	
	//alert( strTime );
	
	// Display Date & Time
	svgElement = SVGDoc.getElementById( "CurrentTime" );
	svgElement.firstChild.nodeValue = strTime;
}

function AddData(x,y) {
	//alert(y);
	var Path=SVGDoc.getElementById('pathData');
	Path.setAttribute('d',Path.getAttribute('d')+' L '+(x-xt1)*(width/(xt2-xt1))+' '+(height-(y-yt1)*(height/(yt2-yt1))));
	return this
}

function updateData( obj ) {
	//alert( +obj.value );
	AddData( ++count, +obj.content )
	//window.status = "";
	if ( count < 100 )
		setTimeout( 'getData()', 1000 );
}

function getData() {
	//window.status = "Acquiring data...";
	getURL( 'http://learnsvg.com/svgchart/randomData.aspx', updateData )
}

function Init( evt ) {
	SVGDoc = evt.getTarget().getOwnerDocument();
	var iW = SVGDoc.documentElement.getAttribute( 'width' );
	var iH = SVGDoc.documentElement.getAttribute( 'height' );
	setInterval( 'DisplayTime()', 1000 );
	//setTimeout( 'getData()', 2000 )
}

]]>
</xsl:comment>
</script>

<text x="210" y="-20" stroke="red" startOffset="0">Streaming line graph.</text>

<g>
<path id="pathData" stroke="darkorange" fill="none" d="M 0 300 L 5 240 L 10 150 L 15 180 L 20 210 L 25 90 L 30 60 L 35 120 L 40 60 L 45 120 L 50 210 L 55 90 L 60 180 L 65 30 L 70 240 L 75 150 L 80 210 L 85 150 L 90 210 L 95 300 L 100 210 L 105 210 L 110 150 L 115 120 L 120 120 L 125 30 L 130 120 L 135 240 L 140 30 L 145 30 L 150 150"/>
</g>

	<defs>
		<pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
			<path d="M10 0 L0 0 L0 10" style="fill:none;stroke:rgb(128,128,128);stroke-width:0.25"/>
		</pattern>
		<circle id="node" r="2" style="stroke-width:0.6;fill:rgb(255,255,255)"/>
		<path id="arrow" d="M0 0 L-10 -2 L-10 2 z"
			 style="stroke:none"/>
		<g id="coords" style="stroke:rgb(0,0,0)">
			<path d="M15 0 L0 0 L0 15" style="fill:none;stroke-width:0.5"/>
			<circle r="1" style="stroke-width:0.2;fill:rgb(255,255,255)"/>
		</g>
		<marker id="startArrow" viewBox="0 -5 10 10" markerUnits="userSpaceOnUse"
			refX="0" refY="0" markerWidth="10" markerHeight="10" orient="auto">
			<path d="M0 0 L10 -2 L10 2 zM0 -5 L0 5"
				 style="stroke:rgb(0,0,0)"/>
		</marker>
		<marker id="endArrow" viewBox="-10 -5 10 10" markerUnits="strokeWidth"
			refX="0" refY="0" markerWidth="10" markerHeight="10" orient="auto">
			<path d="M-10 -2 L0 0 L-10 2 zM0 -5 L0 5"
				 style="stroke:rgb(0,0,0)"/>
		</marker>
	</defs>

	<!-- chart -->
	<g id="Chart" writing-mode="tb" font-size="5" transform="translate( 15, 110 ) rotate( -90 )"  style="fill:black; stroke:none;">
		<!-- labels -->
		<text x="105" y="40" style="fill:black"><xsl:value-of select="$year"/> Pond Levels</text>
		<text x="-5" y="0" style="fill:black">Winter</text>
		<text x="-5" y="30" style="fill:black">Spring</text>
		<text x="-5" y="60" style="fill:black">Summer</text>
		<text x="-5" y="90" style="fill:black">Fall</text>
		<text x="100" y="-13">100</text>
		<text x="90" y="-10">90</text>
		<text x="80" y="-10">80</text>
		<text x="70" y="-10">70</text>
		<text x="60" y="-10">60</text>
		<text x="50" y="-10">50</text>
		<text x="40" y="-10">40</text>
		<text x="30" y="-10">30</text>
		<text x="20" y="-10">20</text>
		<text x="10" y="-10">10</text>
		<g id="grid" style="stroke:rgb(128,128,128);stroke-width:0.25;fill:url(#gridPattern)">
			<line x1="0" y1="0" x2="0" y2="100" style="stroke:black;"/>
			<line x1="0" y1="0" x2="100" y2="0" style="stroke:black;"/>
		</g>
	</g>

<text id="CurrentTime" x="100" y="10" style="fill:black;font-size:8"> </text>

<xsl:apply-templates select = "//month" />

</svg>

</xsl:template>

<xsl:template match = "*" >
               <xsl:value-of select = "*" />
               <xsl:text> </xsl:text>
</xsl:template>

</xsl:stylesheet>