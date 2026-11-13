import bpy, math, time
sc = bpy.context.scene
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 16; sc.cycles.use_denoising = True; sc.cycles.device = 'CPU'
sc.render.resolution_x = 540; sc.render.resolution_y = 960
sc.frame_start = 1; sc.frame_end = 48; sc.render.fps = 24
sc.render.image_settings.file_format = 'PNG'; sc.render.filepath = '/tmp/f/'
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs[0].default_value = (0.9, 0.45, 0.18, 1); w.node_tree.nodes['Background'].inputs[1].default_value = 1.2
def mat(col, em=0):
    m = bpy.data.materials.new('m'); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = col
    if em: b.inputs['Emission Color'].default_value = col; b.inputs['Emission Strength'].default_value = em
    return m
bpy.ops.mesh.primitive_plane_add(size=60); bpy.context.object.data.materials.append(mat((0.05, 0.12, 0.2, 1)))
bpy.ops.mesh.primitive_cylinder_add(radius=.22, depth=1.2, location=(0, 0, .5)); bpy.context.object.data.materials.append(mat((0.7, 0.05, 0.05, 1)))
bpy.ops.mesh.primitive_uv_sphere_add(radius=.17, location=(0, 0, 1.25)); bpy.context.object.data.materials.append(mat((0.8, 0.55, 0.4, 1)))
bpy.ops.mesh.primitive_uv_sphere_add(radius=2.2, location=(0, 14, 2.5)); bpy.context.object.data.materials.append(mat((1, .6, .15, 1), 8))
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(70), 0, math.radians(180))); bpy.context.object.data.energy = 3
bpy.ops.object.camera_add(location=(3, -4, 1.4)); cam = bpy.context.object; sc.camera = cam
bpy.ops.object.empty_add(location=(0, 0, 1)); tgt = bpy.context.object
c = cam.constraints.new('TRACK_TO'); c.target = tgt; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
cam.location = (3, -4, 1.4); cam.keyframe_insert('location', frame=1)
cam.location = (-1.5, -3, 1.1); cam.keyframe_insert('location', frame=48)
t = time.time(); bpy.ops.render.render(animation=True); print('RENDER_SECONDS', time.time() - t, 'for 48 frames 540x960 16spp')
