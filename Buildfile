# ==========================================================================
# Project:   SpcTools
# Copyright: @2014 My Company, Inc.
# ==========================================================================

# This is your Buildfile, which sets build settings for your project.
# For example, this tells SproutCore's build tools that your requires
# the SproutCore framework.
config :all, :required => :sproutcore

# In addition to this Buildfile, which gives settings for your entire project,
# each of your apps has its own Buildfile with settings specific to that app.

#proxy "/data", :to => "ormacsrv1.lpl.arizona.edu", :secure => false, :url => "/data"
#proxy "/data", :to => "tripp.psi.edu", :secure => false, :url => "/data"
proxy "/data", :to => "0.0.0.0", :secure => false, :url => "/data"

