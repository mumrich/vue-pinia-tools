using System.Collections.Generic;

using Mumrich.SpaDevMiddleware;
using Mumrich.SpaDevMiddleware.Contracts;

namespace Vue.PiniaTools.Host
{
  public class AppHostSettings : ISpaDevServerSettings
  {
    public Dictionary<string, SpaSettings> SinglePageApps { get; set; }
  }
}
