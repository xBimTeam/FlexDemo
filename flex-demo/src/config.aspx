<!-- directives -->
<% @Page Language="C#" %>

<!-- code section -->
<script runat="server">

   public void Page_Load(object sender, EventArgs e)
    {
        var environment = new {
            baseUrl = Environment.GetEnvironmentVariable("BaseUrl"),
            clientId = Environment.GetEnvironmentVariable("ClientId"),
            endpoints = new {
                identityBaseUrl = Environment.GetEnvironmentVariable("Endpoints::IdentityEndpoint"),
                flexApiBaseUrl = Environment.GetEnvironmentVariable("Endpoints::FlexApiEndpoint"),
                hubApiBaseUrl = Environment.GetEnvironmentVariable("Endpoints::HubApiEndpoint"),
                commsApiBaseUrl = Environment.GetEnvironmentVariable("Endpoints::CommsApiEndpoint"),
                flexAppBaseUrl = Environment.GetEnvironmentVariable("Endpoints::FlexUIEndpoint"),
                commsAppBaseUrl = Environment.GetEnvironmentVariable("Endpoints::CommsUIEndpoint"),
                publicHomePage = Environment.GetEnvironmentVariable("Endpoints::PublicHomeEndpoint") ?? "https://www.xbim.net"
            }
        };

        var javaScriptSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        string json = javaScriptSerializer.Serialize(environment);

        Response.Clear();
        Response.ContentType = "application/json; charset=utf-8";
        Response.Write(json);
        Response.End();
    }
</script>