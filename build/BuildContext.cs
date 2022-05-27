using Cake.Core;
using Cake.Frosting;

namespace Build
{
  public class BuildContext : FrostingContext
  {
    public string YarnRoot { get; set; }

    public BuildContext(ICakeContext context) : base(context)
    {
    }
  }
}