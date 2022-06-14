using AutoMapper;
using SoftBlue.Library.Database.Models;
using SoftBlue.Library.Dto.Book;
using SoftBlue.Library.Dto.Book.Requests;
using SoftBlue.Library.Dto.Bookcase;
using SoftBlue.Library.Dto.Shared;

namespace SoftBlue.Library.Infrastructure;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<DataEntity, DataDto>()
            .ReverseMap();

        CreateMap<BookEntity, BookDto>()
            .IncludeBase<DataEntity, DataDto>()
            .ReverseMap();

        CreateMap<BookcaseEntity, BookcaseDto>()
            .ReverseMap();

        CreateMap<CreateBookRequest, BookEntity>();
        CreateMap<UpdateBookRequest, BookEntity>();
    }
}