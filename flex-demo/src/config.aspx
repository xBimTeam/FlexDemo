<!-- directives -->
<% @Page Language="C#" %>

<!-- code section -->
<script runat="server">

   public void Page_Load(object sender, EventArgs e)
    {
        var environment = new {
            baseUrl = Environment.GetEnvironmentVariable("BaseUrl") ?? "https://localhost:4202",
            clientId = Environment.GetEnvironmentVariable("ClientId") ?? "853519a5-e1b1-4be8-93b3-ac21a4180294",
            endpoints = new {
                identityBaseUrl = Environment.GetEnvironmentVariable("Endpoints::IdentityEndpoint") ?? "https://id.xbim-dev.net",
                flexApiBaseUrl = Environment.GetEnvironmentVariable("Endpoints::FlexApiEndpoint") ?? "https://api.xbim-dev.net",
                hubApiBaseUrl = Environment.GetEnvironmentVariable("Endpoints::HubApiEndpoint") ?? "https://hub.xbim-dev.net",
                commsApiBaseUrl = Environment.GetEnvironmentVariable("Endpoints::CommsApiEndpoint") ?? "https://comms-api.xbim-dev.net",
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