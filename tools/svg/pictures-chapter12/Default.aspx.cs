using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.IO;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;

namespace SVGChart
{

	#region SVGGenerator
	public class SVGGenerator : System.Web.UI.Page
	{
		protected System.Web.UI.WebControls.DropDownList XslTransformSrc;
		protected System.Web.UI.WebControls.DropDownList DropdownYear;
		protected System.Web.UI.WebControls.TextBox Width;
		protected System.Web.UI.WebControls.TextBox Height;
		protected System.Web.UI.WebControls.Button generateButton;
		protected System.Web.UI.WebControls.Button viewXml;
		protected System.Web.UI.WebControls.Button viewXslt;
		protected System.Web.UI.WebControls.Button viewSvgSource;
		protected System.Web.UI.WebControls.TextBox output1;
		protected System.Web.UI.HtmlControls.HtmlTextArea output2;
		protected System.Web.UI.HtmlControls.HtmlGenericControl embedSvg;
		protected System.Web.UI.HtmlControls.HtmlGenericControl svgFileName;

				
		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{   
			this.XslTransformSrc.SelectedIndexChanged += new System.EventHandler(this.XslTransformSrc_SelectedIndexChanged);
			this.DropdownYear.SelectedIndexChanged += new System.EventHandler(this.DropdownYear_SelectedIndexChanged);
			this.generateButton.Click += new System.EventHandler(this.generateButton_Click);
			this.viewXml.Click += new System.EventHandler(this.viewXml_Click);
			this.viewXslt.Click += new System.EventHandler(this.viewXslt_Click);
			this.viewSvgSource.Click += new System.EventHandler(this.viewSvgSource_Click);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion


		private void Page_Init(object sender, EventArgs e) 
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
		}
		
		public SVGGenerator() 
		{
			//
			// Initializes all event handlers
			//
			Page.Init += new System.EventHandler(Page_Init);
		}

		//****************************************************************
		//
		// The Page_Load event is currently not being used.
		//
		//****************************************************************

		private void Page_Load(object sender, System.EventArgs e) 
		{
		}

		//****************************************************************
		//
		// The XslTransformSrc_SelectedIndexChanged and GenerateBtn_Click 
		// event handlers on this Page are used to generate a new SVG
		//  chart based on user settings.
		//
		//****************************************************************
		
		private void XslTransformSrc_SelectedIndexChanged(object sender, System.EventArgs e)
		{
			String[] args1 = { Server.MapPath( "data/wobegon.xml" ), Server.MapPath( "style/" + XslTransformSrc.SelectedItem.Value + ".xslt" ) };
			if ( XslTransformSrc.SelectedItem.Value != "Start" ) 
			{
				GenerateSVG(args1);
			}
			else
			{
				//Rewrite the 'iframe' and 'embed' tags.
				embedSvg.InnerHtml = "<iframe src='svg/Start.svg' frameBorder='0' width='500' height='300'>"
					+ "<embed src='svg/Start.svg' name='SVGChart' width='500px' height='300px' type='image/svg+xml' pluginspage='http://www.adobe.com/svg/viewer/install/' />"
					+ "</iframe>";
			}
		}
		
		private void DropdownYear_SelectedIndexChanged(object sender, System.EventArgs e)
		{
			String[] args1 = { Server.MapPath( "data/wobegon.xml" ), Server.MapPath( "style/" + XslTransformSrc.SelectedItem.Value + ".xslt" ) };
			if ( XslTransformSrc.SelectedItem.Value != "Start" ) 
			{
				GenerateSVG(args1);
			}
		}

		void generateButton_Click(object sender, System.EventArgs e) 
		{
			String[] args1 = { Server.MapPath( "data/wobegon.xml" ), Server.MapPath( "style/" + XslTransformSrc.SelectedItem.Value + ".xslt" ) };
			if ( XslTransformSrc.SelectedItem.Value != "Start" ) 
			{
				GenerateSVG(args1);
			} 
			else
			{
				//Rewrite the 'iframe' and 'embed' tags.
				embedSvg.InnerHtml = "<iframe src='svg/Start.svg' frameBorder='0' width='500' height='300'>"
					+ "<embed src='svg/Start.svg' name='SVGChart' width='500px' height='300px' type='image/svg+xml' pluginspage='http://www.adobe.com/svg/viewer/install/' />"
					+ "</iframe>";
			}
		}

		//****************************************************************
		//
		// The viewXml, viewXslt and viewSvgSource event handlers on this
		// Page read and output the source of the XML, XSLT and SVG files.
		//
		//****************************************************************

		private void viewXml_Click(object sender, System.EventArgs e)
		{
			output1.Text = "XML source document (wobegon.xml):";
			
			StringWriter writer = new StringWriter(); 
			Console.SetOut(writer);
			
			String[] args1 = { Server.MapPath( "data/wobegon.xml" ) };
			ReadXML(args1);

			output2.InnerHtml = writer.ToString(); 

			Console.WriteLine();
		}

		private void viewXslt_Click(object sender, System.EventArgs e)
		{
			output1.Text = "XSLT source document (" + XslTransformSrc.SelectedItem.Value + ".xslt):";

			StringWriter writer = new StringWriter(); 
			Console.SetOut(writer); 

			String[] args1 = { Server.MapPath( "style/" + XslTransformSrc.SelectedItem.Value + ".xslt" ) };
			ReadXML(args1);

			output2.InnerHtml = writer.ToString(); 

			Console.WriteLine();
		}

		private void viewSvgSource_Click(object sender, System.EventArgs e)
		{
			output1.Text = "XSLT transformation output source (SVG!):";

			StringWriter writer = new StringWriter(); 
			Console.SetOut(writer); 
	
			String[] args1 = { Server.MapPath( "data/wobegon.xml" ), Server.MapPath( "style/" + XslTransformSrc.SelectedItem.Value + ".xslt" ) };
			ReadTransformation(args1);	// ReadTransformation() currently does not use 'args1' parameter.

			output2.InnerHtml = writer.ToString(); 

			Console.WriteLine();
		}

		//****************************************************************
		//
		// The GenerateSVG function is used to generate a new SVG chart
		// based on the users settings.
		//
		//****************************************************************

		public void GenerateSVG(String[] args)
		{
			//Generate random integer for new Svg chart name.
            //Create the randomGenerator.
			Random randomGenerator = new Random(DateTime.Now.Millisecond);
			//Generate random number that's between 0 and 1 trillion ;D
			long randomNum = randomGenerator.Next(0, 1000000000);

			//Write the new SVG file name so that we can view the new SVG source.
			svgFileName.InnerText = "chart" + randomNum + ".svg";

			//Rewrite the 'iframe' and 'embed' tags.
			embedSvg.InnerHtml = "<iframe src='svg/chart" + randomNum + ".svg' frameBorder='0' width='" + Width.Text + "' height='" + Height.Text + "'>"
				+ "<embed src='svg/chart" + randomNum + ".svg' name='SVGChart' width='" + Width.Text + "px' height='" + Height.Text + "px' type='image/svg+xml' pluginspage='http://www.adobe.com/svg/viewer/install/' />"
				+ "</iframe>";
			
			//Create and load the XmlTextWriter.
			XmlTextWriter writer = new XmlTextWriter( Server.MapPath( "svg/chart" + randomNum + ".svg" ), null );
			
			//Create and load the XPathDocument and XslTransform.
			XPathDocument myXPathDocument = new XPathDocument ( args[0] );
			XslTransform myXslTransform = new XslTransform();
			myXslTransform.Load( args[1] );
			
			//Create the XsltArgumentList.
			XsltArgumentList xslArg = new XsltArgumentList();
         
			//Create a parameter which represents the current date and time.
			xslArg.AddParam( "width", "", Width.Text );
			xslArg.AddParam( "height", "", Height.Text );
			xslArg.AddParam( "year", "", DropdownYear.SelectedItem.Value );
			
			//Transform the file.
			myXslTransform.Transform( myXPathDocument, xslArg, writer );

			writer.Close();

			//Clear all the document source content.
			output1.Text = "";
			output2.InnerHtml = ""; 
		}

		//****************************************************************
		//
		// The GenerateSVG function is used to generate a new SVG chart
		// based on the users settings.
		//
		//****************************************************************

		public void ReadXML(String[] args)
		{

			StreamReader stream = null;

			try
			{
				stream = new StreamReader (args[0]);
				Console.Write(stream.ReadToEnd());
			}

			catch (Exception e)
			{
				Console.WriteLine ("Exception: {0}", e.ToString());
			}

			finally
			{
				if (stream != null)
					stream.Close();
			}
		}

		//****************************************************************
		//
		// The GenerateSVG function is used to generate a new SVG chart
		// based on the users settings.
		//
		//****************************************************************

		public void ReadTransformation(String[] args)
		{
			StreamReader stream = null;

			try
			{
				///Read svg source.  File name comes from 'svgFileName'.
				stream = new StreamReader ( Server.MapPath( "svg/" + svgFileName.InnerText ) );
				Console.Write(stream.ReadToEnd());
			}

			catch (Exception e)
			{
				Console.WriteLine ("Exception: {0}", e.ToString());
			}

			finally
			{
				if (stream != null)
					stream.Close();
			}

		}

	}
	#endregion
}
