<?xml version="1.0" encoding="ISO-8859-1"?>

<!-- ====================================================================== -->
<!-- Generate a line graph													-->
<!-- ====================================================================== -->

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes"
              version="1.0"
              encoding="ISO-8859-1" />

<xsl:param name="width" select="'500'"/>
<xsl:param name="height" select="'500'"/>
<xsl:param name="year" select="'2002'"/>

<xsl:template match="//pond">
<svg
    width="{$width}"
    height="{$height}"
    viewBox="0 0 110 90"
    xml:space="preserve"
    onload="Init(evt);">

<script>
<xsl:comment>
<![CDATA[

var SVGDoc=null;
var L1=null;

function Init( evt ) {
	SVGDoc = evt.getTarget().getOwnerDocument();
}

]]>
</xsl:comment>
</script>

<!-- chart -->
<g id="Chart" font-size="5" transform="translate( 10, 70 ) rotate( -90 )">
	<defs>
		<pattern id="gridPattern" width="10" height="8.33" patternUnits="userSpaceOnUse">
			<rect x="0" y="0" width="10" height="8.33" style="fill:none;stroke:rgb(128,128,128);stroke-width:.1"/>
		</pattern>
	</defs>
	<!-- labels -->
	<text x="55" y="15" style="fill:black" writing-mode="tb"><xsl:value-of select="$year"/> <!--<xsl:apply-templates select="title"/>-->Pond <tspan fill="darkorange">Level</tspan> and <tspan fill="blue">Precip</tspan></text>
	
	<xsl:call-template name="monthLabels"/>
	
	<text x="50" y="-10" writing-mode="tb">50</text>
	<text x="40" y="-10" writing-mode="tb">40</text>
	<text x="30" y="-10" writing-mode="tb">30</text>
	<text x="20" y="-10" writing-mode="tb">20</text>
	<text x="10" y="-10" writing-mode="tb">10</text>
	
	<rect x="0" y="0" width="50" height="100" fill="url(#gridPattern)"/>
	
	<line x1="0" y1="0" x2="0" y2="100" style="stroke:black;"/>
	<line x1="0" y1="0" x2="50" y2="0" style="stroke:black;"/>
	<g id="grid">
		<path id="pondLevelData" stroke="darkorange" fill="none"><xsl:attribute name="d"><xsl:text>M </xsl:text> <xsl:call-template name="monthlyLevel"/></xsl:attribute></path>
		<path id="pondPrecipData" stroke="blue" fill="none"><xsl:attribute name="d"><xsl:text>M </xsl:text> <xsl:call-template name="monthlyPrecip"/></xsl:attribute></path>
	</g>
</g>

</svg>

</xsl:template>


<xsl:template match="title">
	<xsl:apply-templates/>
</xsl:template>

<xsl:template name="monthLabels">
	<xsl:for-each select="//year[@id=$year]//month">
		<text x="-2" writing-mode="rl"><xsl:attribute name="y"><xsl:value-of select = "position() * 8.33" /></xsl:attribute><xsl:value-of select="substring( @id, 1, 3 )"/></text>
	</xsl:for-each>
</xsl:template>

<xsl:template name="monthlyLevel">
	<xsl:for-each select="//year[@id=$year]//month//level[.!='']">
		<xsl:choose >
			<xsl:when test = "position()=1" >
				<xsl:value-of select="."/>
				<xsl:text> 0</xsl:text>
			</xsl:when>
   	        <xsl:when test = "position()!=1" >
      			<xsl:text> L </xsl:text>
				<xsl:value-of select="."/>
				<xsl:text> </xsl:text>
				<xsl:value-of select = "position() * 8.33" />
			</xsl:when>
            <xsl:when test = "lang('de')" >Germany ;D</xsl:when>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>

<xsl:template name="monthlyPrecip">
	<xsl:for-each select="//year[@id=$year]//month//precip[.!='']">
		<xsl:choose >
			<xsl:when test = "position()=1" >
				<xsl:value-of select="."/>
				<xsl:text> 0</xsl:text>
			</xsl:when>
   	        <xsl:when test = "position()!=1" >
      			<xsl:text> L </xsl:text>
				<xsl:value-of select="."/>
				<xsl:text> </xsl:text>
				<xsl:value-of select = "position() * 8.33" />
			</xsl:when>
            <xsl:when test = "lang('de')" >Germany</xsl:when>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>

<xsl:template match = "*" >
	<xsl:value-of select = "*" />
	<xsl:text> </xsl:text>
</xsl:template>

</xsl:stylesheet>