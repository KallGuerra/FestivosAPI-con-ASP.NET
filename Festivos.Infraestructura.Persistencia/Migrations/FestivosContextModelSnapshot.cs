﻿// <auto-generated />
using System;
using Festivos.Infraestructura.Persistencia.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Festivos.Infraestructura.Persistencia.Migrations
{
    [DbContext(typeof(FestivosContext))]
    partial class FestivosContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Festivos.Dominio.Entidades.Festivo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)")
                        .HasColumnName("Descripcion");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2")
                        .HasColumnName("Fecha");

                    b.HasKey("Id");

                    b.HasIndex("Fecha")
                        .IsUnique();

                    b.ToTable("Festivo");
                });

            modelBuilder.Entity("Festivos.Dominio.Entidades.FestivoRegla", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Dia")
                        .HasColumnType("int")
                        .HasColumnName("Dia");

                    b.Property<int?>("DiasDesdePascua")
                        .HasColumnType("int")
                        .HasColumnName("DiasDesdePascua");

                    b.Property<int?>("Mes")
                        .HasColumnType("int")
                        .HasColumnName("Mes");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Nombre");

                    b.Property<int>("Tipo")
                        .HasColumnType("int")
                        .HasColumnName("Tipo");

                    b.HasKey("Id");

                    b.ToTable("FestivoRegla");
                });
#pragma warning restore 612, 618
        }
    }
}
