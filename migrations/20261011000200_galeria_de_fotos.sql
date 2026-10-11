-- Más fotos por producto: la lista de direcciones va en "fotos" y los archivos en el almacén público "productos".
alter table public.productos add column if not exists fotos jsonb not null default '[]'::jsonb;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('productos', 'productos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists productos_fotos_subir on storage.objects;
create policy productos_fotos_subir on storage.objects for insert to authenticated
  with check (bucket_id = 'productos' and (select public.es_usuario()) and not (select public.es_vendedor()));
drop policy if exists productos_fotos_borrar on storage.objects;
create policy productos_fotos_borrar on storage.objects for delete to authenticated
  using (bucket_id = 'productos' and (select public.es_usuario()) and not (select public.es_vendedor()));
notify pgrst, 'reload schema';
