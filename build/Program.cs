using System.Threading.Tasks;

using Cake.Core;
using Cake.Core.Diagnostics;
using Cake.Frosting;

public static class Program
{
  public static int Main(string[] args)
  {
    return new CakeHost()
      .UseContext<BuildContext>()
      .Run(args);
  }
}

public class BuildContext : FrostingContext
{
  public bool Delay { get; set; }

  public BuildContext(ICakeContext context)
    : base(context)
  {
    Delay = context.Arguments.HasArgument("delay");
  }
}

[TaskName("Default")]
public class DefaultTask : FrostingTask
{
}