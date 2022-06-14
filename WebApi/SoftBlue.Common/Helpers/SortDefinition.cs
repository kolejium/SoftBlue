using SoftBlue.Common.Enums;

namespace SoftBlue.Common.Helpers;

public class SortDefinition
{
    #region [ Properties ]

    public string DefaultProperty { get; set; } = null;
    public EOrder Order { get; set; }
    public string Property { get; set; }

    #endregion
}