using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoftBlue.Migrations.PostgreSql.Migrations
{
    public partial class AddProcedure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = "CREATE OR REPLACE PROCEDURE public.\"ShiftRightOrder\"(IN startOrder integer DEFAULT 0, IN shift integer DEFAULT 1)" +
                      "LANGUAGE 'sql'" +
                      "AS $BODY$" +
                      "Update public.\"Bookcases\" set \"Order\" = \"Order\" + shift Where \"Order\" >= startOrder;" +
                      "$BODY$;";
            migrationBuilder.Sql(sql);

            sql = "CREATE OR REPLACE PROCEDURE public.\"ShiftLeftOrder\"(IN startOrder integer DEFAULT 0, IN shift integer DEFAULT 1)" +
                      "LANGUAGE 'sql'" +
                      "AS $BODY$" +
                      "Update public.\"Bookcases\" set \"Order\" = \"Order\" - shift Where \"Order\" <= startOrder;" +
                      "$BODY$;";

            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROC public.\"ShiftLeftOrder\"");
            migrationBuilder.Sql("DROP PROC public.\"ShiftRightOrder\"");
        }
    }
}
