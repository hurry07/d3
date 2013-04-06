<%@ Page language="c#" Codebehind="Default.aspx.cs" AutoEventWireup="false" Inherits="SVGChart.SVGGenerator" %>
<%@ Import Namespace="SVGChart" %>
<HTML>
	<HEAD>
		<link href='<%= Request.ApplicationPath + "/style/Main.css" %>' type=text/css rel=stylesheet>
	</HEAD>
	<body bottomMargin="0" leftMargin="0" topMargin="0" rightMargin="0" marginwidth="0" marginheight="0">
		<form id="Form1" runat="server">
			<span id="svgFileName" runat="server" style="DISPLAY:none">Start.svg</span>
			<div align="center">
				<table cellSpacing="0" cellPadding="4" width="100%" border="0">
					<tr vAlign="top">
						<td align="middle" width="*">
							<table cellSpacing="0" cellPadding="0" width="700">
								<tr>
									<td class="Head" align="left">SVG Charting Application</td>
									<td class="Head" align="right">
										<iframe marginWidth="0" marginHeight="0" src="svg/svgtest.svg" frameBorder="0" width="100" height="100">
											<embed src="svg/svgtest.svg" name="SVGEmbed" width="100px" height="100px" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
										</iframe></td>
								</tr>
								<tr>
									<td colSpan="2">
										<hr noShade SIZE="1">
									</td>
								</tr>
							</table>
							<table cellSpacing="0" cellPadding="0" width="700">
								<tr vAlign="top">
									<td class="SubHead" align="right">Type of Chart: &nbsp;
									</td>
									<td align="left">
										<asp:dropdownlist id="XslTransformSrc" runat="server" width="120" AutoPostBack="True">
											<asp:listitem>Start</asp:listitem>
											<asp:listitem>Line</asp:listitem>
											<asp:listitem>Bar</asp:listitem>
											<asp:listitem>Column</asp:listitem>
											<asp:listitem>Streaming</asp:listitem>
										</asp:dropdownlist>
										&nbsp;
										<asp:button class="CommandButton" id="generateButton" runat="server" CausesValidation="False" Text="Go"></asp:button>&nbsp;&nbsp;
									</td>
									<td class="SubHead" align="right" width="100">Width: &nbsp;
									</td>
									<td align="left" width="50"><asp:textbox id="Width" width="50" Runat="server">500</asp:textbox></td>
									<td class="SubHead" align="right">Height: &nbsp;</td>
									<td align="left"><asp:textbox id="Height" width="50" Runat="server">300</asp:textbox></td>
									<td class="SubHead" align="right">Year: &nbsp;</td>
									<td align="left" width="50">
										<asp:dropdownlist id="DropdownYear" runat="server" width="120" AutoPostBack="True">
											<asp:listitem>2002</asp:listitem>
											<asp:listitem>2001</asp:listitem>
											<asp:listitem>2000</asp:listitem>
										</asp:dropdownlist></td>
								</tr>
								<tr vAlign="top">
									<td colSpan="8">&nbsp;
									</td>
								</tr>
								<tr vAlign="top">
									<td class="SiteLink" align="middle" colSpan="8">
										<asp:button class="CommandButton" id="viewXml" runat="server" CausesValidation="False" Text="View XML"></asp:button>&nbsp;&nbsp;
										<asp:button class="CommandButton" id="viewXslt" runat="server" CausesValidation="False" Text="View XSLT"></asp:button>&nbsp;&nbsp;
										<asp:button class="CommandButton" id="viewSvgSource" runat="server" CausesValidation="False" Text="View SVG"></asp:button></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<p>
					<span id="embedSvg" runat="server">
						<iframe src="svg/Start.svg" frameBorder="1" width="500" height="300">
							<embed src="svg/Start.svg" name="SVGChart" width="500px" height="300px" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
						</iframe>
					</span>
				</p>
				<table cellSpacing="0" cellPadding="4" width="700" border="0">
					<tr vAlign="top">
						<td align="left" width="*"><asp:textbox id="output1" runat="server" Width="526px"></asp:textbox><br>
							<textarea id="output2" rows="30" cols="80" runat="server" align="left"></textarea>
							<P></P>
						</td>
					</tr>
				</table>
			</div>
		</form>
		</SPAN>
	</body>
</HTML>
