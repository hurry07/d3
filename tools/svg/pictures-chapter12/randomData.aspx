<script language="C#" runat="server">

void Page_Load(Object Src, EventArgs E) {

	//Create the randomGenerator.
	Random randomGenerator = new Random(DateTime.Now.Millisecond);

	//Generate random number.
	float randomNum = randomGenerator.Next(0, 11);

	//Return random number to client.
	Response.Write ( randomNum * 10 );
}

</script>
