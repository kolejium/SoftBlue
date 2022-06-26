namespace SoftBlue.Library.Dto.Bookcase.Requests;

public class CreateBookcaseRequest
{
    public int? Order { get; set; }

    public bool InsertInCurrentOrder { get; set; } = true;
}